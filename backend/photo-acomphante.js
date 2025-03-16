import puppeteer from 'puppeteer';
import fs from 'fs';
const URL = 'https://www.photoacompanhantes.com/acompanhantes/cabo-frio';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  
  // Abre uma nova página
  const page = await browser.newPage();
  
  await page.goto(URL);
  
  const result = await page.evaluate(() => {
    
    const results = document.querySelectorAll('.resultados .pin');
    const list  = [...results];
    console

    const data =  list.map((item) => ({
      length: list.length,
      img: item.querySelector('.pin div a figure span img')?.getAttribute('src'),
      name: item.querySelector('.pin div a figure .titulo')?.textContent,
      age: item.querySelector('.pin .categorias .categorias_basicas').childNodes[1]?.textContent,  
      value: item.querySelector('.pin .categorias .categorias_basicas').childNodes[2]?.textContent,  
    })); 

    return data;
  });

  console.log(result);

  fs.writeFile('photo-acompanhante.json', JSON.stringify(result, null, 2), err => {
    if (err) throw new Error('something went wrong');
  });

  // Fecha o navegador
  // await browser.close();
})();
