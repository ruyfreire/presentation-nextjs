import { expect, test } from '@playwright/test'

import { aboutEvidence, aboutStack } from '@/app/(public)/about/about-content'

import { getApiStatusResponse } from './fixtures/responses'

test.beforeEach(async ({ page }) => {
  await page.route('**/api-status', async (route) => {
    await route.fulfill({
      status: 200,
      json: getApiStatusResponse(),
    })
  })
})

test('image has alt text', async ({ page }) => {
  await page.goto('/about')

  await expect(
    page.getByRole('img', { name: 'Desenho do ecossistema do projeto' }),
  ).toBeVisible()
})

test('footer links are visible and have correct href', async ({ page }) => {
  await page.goto('/about')

  const linkOne = page.getByRole('link', { name: aboutStack.githubs[0].label })
  await expect(linkOne).toHaveAttribute('href', aboutStack.githubs[0].href)
  await expect(linkOne).toHaveAttribute('target', '_blank')

  const linkTwo = page.getByRole('link', { name: aboutStack.githubs[1].label })
  await expect(linkTwo).toHaveAttribute('href', aboutStack.githubs[1].href)
  await expect(linkTwo).toHaveAttribute('target', '_blank')

  const linkThree = page.getByRole('link', { name: 'API Swagger' })
  await expect(linkThree).toHaveAttribute('href', /\/docs$/)
  await expect(linkThree).toHaveAttribute('target', '_blank')
})

test('about page navigate to home page', async ({ page }) => {
  await page.goto('/about')

  await page.getByRole('link', { name: 'Voltar ao currículo' }).click()

  await expect(page).toHaveURL('/')
})

test('carousel navigation buttons are visible and work', async ({
  page,
  viewport,
}) => {
  await page.goto('/about')

  const mobile = viewport?.width ? viewport.width < 768 : false

  const previousButton = page.getByRole('button', { name: 'Imagem anterior' })
  const nextButton = page.getByRole('button', { name: 'Próxima imagem' })
  await expect(previousButton).toBeVisible()
  await expect(nextButton).toBeVisible()

  const carouselItemOne = aboutEvidence.items[0]
  const firstSlide = page.getByRole('group', {
    name: `1 de ${aboutEvidence.items.length}: ${carouselItemOne.title}`,
    includeHidden: true,
  })

  const carouselItemTwo = aboutEvidence.items[mobile ? 1 : 2]
  const secondSlide = page.getByRole('group', {
    name: `${mobile ? 2 : 3} de ${aboutEvidence.items.length}: ${carouselItemTwo.title}`,
    includeHidden: true,
  })

  await expect(firstSlide).toHaveAttribute('aria-hidden', 'false')
  await expect(secondSlide).toHaveAttribute('aria-hidden', 'true')

  await nextButton.click()
  await expect(firstSlide).toHaveAttribute('aria-hidden', 'true')
  await expect(secondSlide).toHaveAttribute('aria-hidden', 'false')

  await previousButton.click()
  await expect(firstSlide).toHaveAttribute('aria-hidden', 'false')
  await expect(secondSlide).toHaveAttribute('aria-hidden', 'true')
})

test('carousel images has accessible alt text', async ({ page }) => {
  await page.goto('/about')

  for (const item of aboutEvidence.items) {
    await expect(
      page.getByRole('img', {
        name: `Imagem de ${item.title}`,
        includeHidden: true,
      }),
    ).toBeAttached()
  }
})

test('open and close image dialog', async ({ page }) => {
  await page.goto('/about')

  const imageOne = aboutEvidence.items[0]

  expect(page.getByRole('dialog')).not.toBeVisible()

  await page
    .getByRole('group', {
      includeHidden: true,
      name: `1 de ${aboutEvidence.items.length}: ${imageOne.title}`,
    })
    .click()

  await expect(page.getByRole('dialog')).toBeVisible()

  await expect(
    page
      .getByRole('dialog')
      .getByRole('img', { name: `Imagem de ${imageOne.title}` }),
  ).toBeVisible()

  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Reduzir imagem' })
    .click()

  await expect(page.getByRole('dialog')).not.toBeVisible()
})
