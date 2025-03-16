import puppeteer from 'puppeteer';
import fs from 'fs';
const URL = 'https://fatalmodel.com/acompanhantes-rio-de-janeiro-rj';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  
  // Abre uma nova página
  const page = await browser.newPage();
  
  await page.goto(URL);
  
  const result = await page.evaluate(() => {
    
    const results = document.querySelectorAll('.listing-section .shadow-listing-cards');
    const list  = [...results];

    const data =  list.map((item) => ({
      img: item.querySelector('a img')?.getAttribute('src'),
      name: item.querySelector('.text-base')?.textContent,
      age: item.querySelector('.flex .text-xs .text-ds-black-fm')?.textContent,  
      value: item.querySelector('.price-list__value')?.textContent,  
      link: item.querySelector('a')?.getAttribute('href')
    })); 

    return data;
  });

  console.log(result);

  fs.writeFile('fatal-model.json', JSON.stringify(result, null, 2), err => {
    if (err) throw new Error('something went wrong');
  });

  // Fecha o navegador
  await browser.close();
})();
