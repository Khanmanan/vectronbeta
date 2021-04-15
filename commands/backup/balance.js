const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['bal'],
            description: 'Check your balance!... FUN FACT [ This economy system is for each server seperate! ]',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 10 * 1000,
                stack: false,
            },

        })
    }
        async run(message, args) {
            const usedtimes = require('../../models/usedtimes');
            const usedconfig = await usedtimes.findOne({
                user: message.author.id
            })

            const num = await usedconfig.get("times")

            await usedconfig.updateOne({
                times: parseInt(num) + 1
            })
            eco.connect(mongoPath)
            const user = message.mentions.users.first() || message.author

            const balance = await eco.balance(user.id, message.guild.id); 

            const bal = new MessageEmbed()
            .setColor(`GREEN`)
            .addFields(
                {
                    name: `${user.username}'s Balance`,
                    value: `Wallet: ${balance.wallet} \n Bank: ${balance.bank}/${balance.bankCapacity} \n Total: ${balance.wallet + balance.bank}`,
                    inline: false
                },
            )
            .setTimestamp()
            .setFooter(`Donate us`)
        
            message.channel.send(bal)
        }
    }