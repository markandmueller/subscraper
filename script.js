const puppeteerExtra = require("puppeteer-extra");
const stealthPLugin = require("puppeteer-extra-plugin-stealth");
const urls = [];

async function scrapePage(url) {
  puppeteerExtra.use(stealthPLugin());
  const browser = await puppeteerExtra.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 90000 });

  // await page.screenshot({ path: "screenshot3.png" });

  const links = await page.$$(".vehicle_title a");
  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    const urlText = await page.evaluate((link) => link.href, link);
    urls.push(urlText);
  }

  console.log("in the scrapePage function", urls);

  await browser.close();
}

async function scrapeVehicle(url) {
  puppeteerExtra.use(stealthPLugin());
  const browser = await puppeteerExtra.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 90000 });

  const [elTitle] = await page.$x(`//*[@id="region_5"]/div[2]/div[1]/h1`);
  const title = await elTitle.getProperty("textContent");
  const titleText = await title.jsonValue();

  const [elVIN] = await page.$x(
    `//*[@id="region_2"]/div[1]/div/div[1]/div/div[2]/span[2]`
  );
  const vin = await elVIN.getProperty("textContent");
  const vinText = await vin.jsonValue();

  const [elStock] = await page.$x(
    `//*[@id="region_2"]/div[1]/div/div[1]/div/div[1]/span[2]`
  );
  const stock = await elStock.getProperty("textContent");
  const stockText = await stock.jsonValue();

  const [elPrice] = await page.$x(
    `//*[@id="region_5"]/div[2]/div[2]/div/div[1]/div/div/div/dl/dd`
  );
  const price = await elPrice.getProperty("textContent");
  const priceText = await price.jsonValue();

  console.log({ titleText, vinText, stockText, priceText });
  // console.log({ titleText });
  // console.log({ vinText });
  // console.log({ stockText });
  // console.log({ priceText });

  await browser.close();
}

// scrapePage("http://www.cumorahtreeservice.com/");

scrapePage(
  "https://www.subarusb.com/search/used-subaru-san-bernardino-ca/?cy=92408&mk=60&tp=used"
);
scrapePage(
  "https://www.subarusb.com/search/used-subaru-san-bernardino-ca/?cy=92408&mk=60&p=2&tp=used"
);

// if (urls.length === 19) {
//   console.log("after both scrapePage function invocations", urls);
// }

// scrapeVehicle(
//   "https://www.subarusb.com/auto/used-2019-subaru-impreza-20i-san-bernardino-ca/76967798/"
// );
