import { expect, test } from '@playwright/test'

import { getProfileResponse } from './fixtures/responses'

const profile = getProfileResponse()

test.beforeEach(async ({ page }) => {
  await page.route('**/profile', async (route) => {
    await route.fulfill({
      status: 200,
      json: profile,
    })
  })
})

test('home page loads profile', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { level: 1, name: profile.data.name }),
  ).toBeVisible()

  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    profile.data.contact.linkedin,
  )

  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    profile.data.contact.github,
  )

  await expect(page.getByText(profile.data.bio!, { exact: true })).toBeVisible()

  await expect(
    page.getByRole('heading', {
      level: 3,
      name: profile.data.experiences[0]?.role ?? '',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('heading', {
      level: 3,
      name: profile.data.education[0]?.title ?? '',
    }),
  ).toBeVisible()
})

test('home page navigate to about page', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Como este site foi feito' }).click()

  await expect(page).toHaveURL('/about')
})

test('show error message when profile not found', async ({ page }) => {
  await page.route('**/profile', async (route) => {
    await route.fulfill({
      status: 404,
      json: { message: 'Profile not found' },
    })
  })

  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Ops, Perfil não encontrado!',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'saiba mais sobre este projeto' }),
  ).toBeVisible()
})

test('show error message when request fails', async ({ page }) => {
  await page.route('**/profile', async (route) => {
    await route.abort()
  })

  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Ops, Erro ao carregar o perfil!',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'saiba mais sobre este projeto' }),
  ).toBeVisible()
})
