import puppeteer from 'puppeteer'

describe('Adding Bags', () => {
    let browser: Browser

    beforeAll(async () => {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
      }, 70000)

    afterAll(async () => {
        await browser.close()
    })

    it('should add a bag to the order', async () => {
        const page = await browser.newPage()
        await page.goto('http://localhost:6262')
    })
})