import axios from 'axios';
import cheerio from 'cheerio';

const urlUSD = 'https://br.investing.com/crypto/bitcoin/btc-usd';
const urlBRL = 'https://br.investing.com/crypto/bitcoin/btc-brl';

class WebScrapingBTC {
  public async scrapingUSD() {
    try {
      const apiAxios = axios.create();
      const response = await apiAxios.get(urlUSD);

      const html = response.data;
      const $ = cheerio.load(html);

      // const elemValue = $('.pclqee');
      const elemValue = $('span.text-2xl');

      return elemValue.html() as string;
    } catch {
      return '0';
    }
  }

  public async scrapingBRL() {
    try {
      const apiAxios = axios.create();
      const response = await apiAxios.get(urlBRL);

      const html = response.data;
      const $ = cheerio.load(html);

      // const elemValue = $('.pclqee');
      const elemValue = $('span.text-2xl');

      return elemValue.html() as string;
    } catch {
      return '0';
    }
  }
}

export default WebScrapingBTC;
