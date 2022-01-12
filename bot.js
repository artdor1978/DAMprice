//import necessary libraries
const { Telegraf } = require('telegraf');
const getText = require('./convert');
const getScreen = require('./screen');

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
