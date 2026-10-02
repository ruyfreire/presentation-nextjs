import test, { expect } from '@playwright/test'

import { formatDate } from '@/utils/formatters'

import { getMeResponse, getProfileResponse } from './fixtures/responses'

const profile = getProfileResponse()

test.beforeEach(async ({ page }) => {
  await page.route('**/profile', async (route) => {
    await route.fulfill({
      status: 200,
      json: profile,
    })
  })

  await page.route('**/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      json: getMeResponse(),
    })
  })

  await page.route('**/auth/logout', async (route) => {
    await route.fulfill({
      status: 200,
    })
  })
})

test('fill profile data on form', async ({ page }) => {
  await page.goto('/admin')

  await expect(
    page.getByText(`Atualização: ${formatDate(profile.data.updatedAt)}`),
  ).toBeVisible()

  await expect(page.getByRole('textbox', { name: 'Nome' })).toHaveValue(
    profile.data.name,
  )

  await expect(page.getByRole('textbox', { name: 'Empresa' })).toHaveValue(
    profile.data.experiences[0].company,
  )

  await expect(page.getByRole('textbox', { name: 'Título' })).toHaveValue(
    profile.data.education[0].title,
  )
})

test('enable save button when form is valid and dirty and show toast when save is successful', async ({
  page,
}) => {
  await page.goto('/admin')

  await expect(page.getByRole('button', { name: 'Salvar' })).toBeDisabled()

  await page.getByRole('textbox', { name: 'Nome' }).fill('John Doe')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(
    page
      .getByRole('region', { name: 'Notifications' })
      .getByRole('listitem')
      .filter({ hasText: 'Salvo com sucesso' }),
  ).toBeVisible()
})

test('redirect page on logout by header', async ({ page }) => {
  await page.goto('/admin')

  await page.locator('header').getByRole('button', { name: 'Sair' }).click()

  await expect(page).toHaveURL('/signin')
})

test('redirect page on logout by sidebar', async ({ page, isMobile }) => {
  await page.goto('/admin')

  if (isMobile) {
    await page.getByRole('button', { name: 'Alternar menu' }).click()
  }

  const menu = isMobile
    ? page.getByRole('dialog', { name: 'Menu' })
    : page.getByRole('complementary', { name: 'Menu' })

  await menu.getByRole('button', { name: 'Sair' }).click()

  await expect(page).toHaveURL('/signin')
})

test('show success toast when cache is updated successfully', async ({
  page,
}) => {
  await page.goto('/admin')

  await page.getByRole('button', { name: 'Atualizar cache' }).click()

  await expect(
    page
      .getByRole('region', { name: 'Notifications' })
      .getByRole('listitem')
      .filter({ hasText: 'Cache atualizado com sucesso' }),
  ).toHaveAttribute('data-type', 'success')
})

test('show error toast when cache is updated fails', async ({ page }) => {
  await page.route('**/*', async (route) => {
    const request = route.request()
    if (request.method() === 'POST' && request.headers()['next-action']) {
      await route.abort()
      return
    }
    await route.fallback()
  })

  await page.goto('/admin')

  await page.getByRole('button', { name: 'Atualizar cache' }).click()

  await expect(
    page
      .getByRole('region', { name: 'Notifications' })
      .getByRole('listitem')
      .filter({ hasText: 'Erro ao atualizar cache' }),
  ).toHaveAttribute('data-type', 'error')
})
