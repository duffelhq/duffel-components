import puppeteer, { Browser, PuppeteerLaunchOptions } from "puppeteer";
import { testDuffelAncillariesComponentIntegration } from "./lib/testDuffelAncillariesComponentIntegration";

const puppeteerLaunchOptions: PuppeteerLaunchOptions = {
  headless: "new",
};

export default (async function main() {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch(puppeteerLaunchOptions);
    const urlToRunTheTest = process.argv[2];
    if (!urlToRunTheTest) {
      throw new Error("A url is needed to run the e2e test.");
    }

    const page = await browser.newPage();

    await page.goto(urlToRunTheTest);

    await testDuffelAncillariesComponentIntegration(page);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
