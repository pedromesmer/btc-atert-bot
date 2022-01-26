// import express from 'express';
import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import WebScrapingBTC from './WebScrapingBTC';

config();

const bot = new Telegraf(process.env.BOT_KEY || '');
// const app = express();
const webScraping = new WebScrapingBTC();

bot.start(async ctx => {
  ctx.reply('Bem vindo ao BENDER');
  ctx.reply('Vou te avisar as alterações do BTC a cada U$ 5000');

  console.log('chat ID: ', ctx.message.chat.id);
});

bot.command('stop', async ctx => {
  console.log('chat ID: ', ctx.message.chat.id);

  ctx.reply('Você não vai mais ser alertado!');
});

bot.help(ctx =>
  ctx.reply(`
/start => inicia os aletas
/quit => para os alertas

btc ou BTC => informa o valor atual em dolar e real

`),
);

bot.on('text', async ctx => {
  if (ctx.message.text.toLowerCase() === 'btc') {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      `R$ ${await webScraping.scrapingBRL().then(response => response)}`,
    );
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      `U$ ${await webScraping.scrapingUSD().then(response => response)}`,
    );
  }
  // else {
  //   ctx.telegram.sendMessage(
  //     ctx.message.chat.id,
  //     'Não entendi, envie /help para instruções',
  //   );
  // }
});

bot.launch();

// app.listen(3333, async () => {
//   console.log(`🚀 Server started on port 3333`);
//   console.log('BRL ', await webScraping.scrapingUSD());
//   console.log('USD ', await webScraping.scrapingBRL());
// });
