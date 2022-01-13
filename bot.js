//import necessary libraries
const { Telegraf } = require('telegraf');
const getText = require('./convert');
const getScreen = require('./screen');

require('https').createServer().listen(process.env.PORT || 5000).on('request', function (req, res) {
    res.end('')
});

require('dotenv').config();
//create new instance of telegraf
const bot = new Telegraf(process.env.TELEGRAM_ACCESS_TOKEN);
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', requestPhoneKeyboard)
})
//method that displays the inline keyboard buttons 
bot.hears('DAM', ctx => {
    getText().then(() => {
        getScreen().then(() => {
            bot.telegram.sendPhoto(ctx.chat.id, {
                source: "./example.png"
            })
        }).catch((err) => {
            console.log(err)
        });
    })

})

const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "DAM",
                callback_data: 'DAM'
            }],
            ["Cancel"]
        ]
    }
};

//method to start get the script to pulling updates for telegram 

bot.launch();


//https://devcenter.heroku.com/articles/deploying-nodejs
//https://javascript.plainenglish.io/how-to-use-node-js-with-google-sheets-c256c26e10fc
//https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update

//https://daily-dev-tips.com/posts/nodejs-write-data-in-a-google-sheet/
//https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f


//https://olefyrenko.com/blog/how-to-create-a-telegram-crypto-bot-in-javascript
//https://www.sohamkamani.com/blog/2016/09/21/making-a-telegram-bot/
//https://www.section.io/engineering-education/telegram-bot-in-nodejs/

//https://medium.com/geekculture/build-a-telegram-bot-using-typescript-node-js-and-telegraf-and-deploy-it-on-heroku-fcc28c15614f
//https://dev.to/benjami51033333/build-a-bot-with-telegram-and-ibm-watson-io5
//https://flaviocopes.com/google-api-authentication/

//https://googleapis.dev/nodejs/googleapis/latest/tasks/

//https://polyakovdmitriy.ru/bot-telegram/
//https://archakov.im/post/kak-razmestit-telegram-bota-na-servere
//https://archakov.im/post/telegram-bot-on-nodejs
///https://devcenter.heroku.com/articles/getting-started-with-nodejs#view-logs