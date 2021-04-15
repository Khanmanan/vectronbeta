const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "credits",
        aliases: [''],
        category: 'info',
        description: 'Shows A Aerv credits',
        usage: '',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
            const embed = new MessageEmbed()
                .setTitle(`Aerv Credits`)
                .setColor("GREEN")
                .setDescription(`**Aerv** is a bot created by **Madness** and **discord.gg/devs** we provide all copyrights and add license to our application!`)
                .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed)
    }
};
