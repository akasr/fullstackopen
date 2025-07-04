const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(
        page.getByText('Matti Luukkainen logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await addBlog(
        page,
        "This is Someone's blog",
        'https://someone.blog',
        'Someone'
      )

      await expect(
        page.getByText("This is Someone's blog Someone")
      ).toBeVisible()
    })

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await addBlog(
          page,
          'Second Blog',
          'https://second.blog',
          'Second Someone'
        )
        await addBlog(page, 'Third Blog', 'https://third.blog', 'Third Someone')
      })

      test('then any one of those can be liked', async ({ page }) => {
        const otherBlogText = await page.getByText('Third Blog Third Someone')
        const otherBlogElement = await otherBlogText
          .locator('..')
          .filter({ hasText: 'Third Blog Third Someone' })

        await otherBlogElement.getByRole('button', { name: 'view' }).click()

        await otherBlogElement.getByRole('button', { name: 'like' }).click()
      })

      test('then they are arranged in decreasing order of their likes', async ({
        page,
      }) => {
        while ((await page.getByRole('button', { name: 'view' }).count()) > 0) {
          await page.getByRole('button', { name: 'view' }).first().click()
        }

        await page.getByRole('button', { name: 'like' }).last().click()
        await expect(page.getByText('likes 1')).toBeVisible()

        const likesDivs = await page.getByText(/likes \d+/).all()
        const likes = await Promise.all(
          likesDivs.map(async (div) => {
            const likesText = await div.textContent()
            return parseInt(likesText.split(' ')[1])
          })
        )
        
        const sortedLikes = [...likes].sort((a, b) => b - a)
        expect(likes).toEqual(sortedLikes)
      })

      describe('and all of them have a remove button which', () => {
        test('are present if blog is added by the user logged in', async ({
          page,
        }) => {
          const otherBlogText = await page.getByText('Third Blog Third Someone')
          const otherBlogElement = await otherBlogText
            .locator('..')
            .filter({ hasText: 'Third Blog Third Someone' })

          await otherBlogElement.getByRole('button', { name: 'view' }).click()

          await expect(
            otherBlogElement.getByRole('button', { name: 'remove' })
          ).toBeVisible()
        })

        test('are absent if blog is not added by the user logged in', async ({
          page,
          request,
        }) => {
          await request.post('/api/users', {
            data: {
              name: 'Akash Raj',
              username: 'akash',
              password: 'raj',
            },
          })

          await page.getByRole('button', { name: 'logout' }).click()

          await loginWith(page, 'akash', 'raj')

          const otherBlogText = await page.getByText('Third Blog Third Someone')
          const otherBlogElement = await otherBlogText
            .locator('..')
            .filter({ hasText: 'Third Blog Third Someone' })

          await otherBlogElement.getByRole('button', { name: 'view' }).click()

          await expect(
            otherBlogElement.getByRole('button', { name: 'remove' })
          ).not.toBeVisible()
        })
      })
    })
  })
})
