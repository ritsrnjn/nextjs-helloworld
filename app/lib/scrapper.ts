import axios from 'axios';
import * as cheerio from "cheerio";
import puppeteer from 'puppeteer';

// Path: app/lib/data.ts

// export async function fetchNumberOfPlayersInPlayOGame() {
//   const response = await axios.get('https://playo.co/match/4211f58a-b76c-48fa-983f-0b7561cb1710');
//   const selector = cheerio.load(response.data);
//   console.log({
//     name: selector('.border-primary').first().text(),
//     price: selector('.text-sm.font-semibold').text(),
//     priceFull: selector('.lg.md').text(),
//     // description: selector('.product-description').text(),
//   });
//     return '4567 players in PlayO Game';
// }


export async function fetchNumberOfPlayersInPlayOGame() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://playo.co/match/4211f58a-b76c-48fa-983f-0b7561cb1710');

  const data = await page.evaluate(() => {
    const numberOfPlayers = document.querySelector('.border-primary')?.textContent;
    return { numberOfPlayers };
  });

  console.log(data);

  await browser.close();

  return data.numberOfPlayers;
}