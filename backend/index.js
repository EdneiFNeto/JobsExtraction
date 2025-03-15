import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  
  // Abre uma nova página
  const page = await browser.newPage();
  
  // Navega até o site desejado
  await page.goto('https://fatalmodel.com/acompanhantes-rio-de-janeiro-rj');
  
  const list = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('section img');
    const array = [...nodeList];
    return array.map(element => { return element.src });
  });


  fs.writeFile('data.json', JSON.stringify(list, null, 2), err => {
    if (err) throw new Error('something went wrong');
  });

  
  // Fecha o navegador
  await browser.close();
})();

