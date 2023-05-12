// console.log("test");

const puppeteerExtra = require("puppeteer-extra");
const stealthPLugin = require("puppeteer-extra-plugin-stealth");

async function scrapePage(url) {
  puppeteerExtra.use(stealthPLugin());
  const browser = await puppeteerExtra.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // there are multiple of these, I need to loop through something....
  // this isn't the correct solution
  const [linkEl] = await page.$x(
    '//*[@id="region_3"]/div[3]/div[3]/div[1]/div[1]/div[1]/h2'
  );
  const link = await linkEl.getProperty("ahref");
  const linkText = await link.jsonValue();

  console.log({ linkText });
}

async function scrapeVehicle(url) {
  puppeteerExtra.use(stealthPLugin());
  const browser = await puppeteerExtra.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const [elTitle] = await page.$x('//*[@id="region_5"]/div[2]/div[1]/h1');
  const title = await elTitle.getProperty("textContent");
  const titleText = await title.jsonValue();

  const [elVIN] = await page.$x(
    '//*[@id="region_2"]/div[1]/div/div[1]/div/div[2]/span[2]'
  );
  const vin = await elVIN.getProperty("textContent");
  const vinText = await vin.jsonValue();

  const [elStock] = await page.$x(
    '//*[@id="region_2"]/div[1]/div/div[1]/div/div[1]/span[2]'
  );
  const stock = await elStock.getProperty("textContent");
  const stockText = await stock.jsonValue();

  const [elPrice] = await page.$x(
    '//*[@id="region_5"]/div[2]/div[2]/div/div[1]/div/div/div/dl/dd'
  );
  const price = await elPrice.getProperty("textContent");
  const priceText = await price.jsonValue();

  console.log({ titleText, vinText, stockText, priceText });

  //   const allVehicles = await page.evaluate(() => {
  //     const vehicles = document.querySelectorAll(".loopslider__image_container");

  //     return Array.from(vehicles).map((vehicle) => {
  //       const title = vehicle.querySelector().innerText;
  //       const vin = vehicle.querySelector().innerText;
  //       const stock = vehicle.querySelector().innerText;
  //       const price = vehicle.querySelector().innerText;
  //       return { title, vin, stock, price };
  //     });
  //   });

  //   console.log(allVehicles);

  //   await page.screenshot({ path: "amazing1.png" });

  await browser.close();
}

// scrapeVehicle(
//   "https://www.subarusb.com/auto/used-2019-subaru-impreza-20i-san-bernardino-ca/76967798/"
// );

scrapePage(
  "https://www.subarusb.com/search/used-subaru-san-bernardino-ca/?cy=92408&mk=60&tp=used"
);
