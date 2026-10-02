import test, { expect } from '@playwright/test'

import { getMeResponse, signInResponse } from './fixtures/responses'

test.beforeEach(async ({ page }) => {
  await page.route('**/auth/signin', async (route) => {
    await route.fulfill({
      status: 200,
      json: signInResponse(),
    })
  })

  await page.route('**/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      json: getMeResponse(),
    })
  })
})

test('successfully signs in', async ({ page }) => {
  await page.goto('/signin')

  await page
    .getByRole('textbox', { name: 'E-mail' })
    .pressSequentially('test@test.com', { delay: 10 })
  await page
    .getByRole('textbox', { name: 'Senha' })
    .pressSequentially('password', { delay: 10 })
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL('/admin')
})

test('error message on required fields', async ({ page }) => {
  await page.goto('/signin')

  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(
    page.getByRole('group').filter({ hasText: 'E-mail' }).getByRole('alert'),
  ).toHaveText('Campo obrigatório')

  await expect(
    page.getByRole('group').filter({ hasText: 'Senha' }).getByRole('alert'),
  ).toHaveText('Campo obrigatório')
})

test('open toast on invalid credentials', async ({ page }) => {
  await page.route('**/auth/signin', async (route) => {
    await route.fulfill({
      status: 400,
      json: {
        message: 'Invalid credentials',
      },
    })
  })

  await page.goto('/signin')

  await page
    .getByRole('textbox', { name: 'E-mail' })
    .pressSequentially('test@test.com', { delay: 10 })
  await page
    .getByRole('textbox', { name: 'Senha' })
    .pressSequentially('password', { delay: 10 })
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(
    page
      .getByRole('region', { name: 'Notifications' })
      .getByRole('listitem')
      .filter({ hasText: 'Credenciais inválidas' }),
  ).toHaveAttribute('data-type', 'error')
})
