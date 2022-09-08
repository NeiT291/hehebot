const { EmbedBuilder } = require("discord.js")
const { readdirSync } = require('fs');
module.exports = {
    name: 'help',
    category: 'info',
    aliases: ['h'],
    run: (client, message, args) => {
        let count = 0;
        readdirSync('./commands').forEach(dir => {
            const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
            for(const file of commands){
                const pull = require(`../../commands/${dir}/${file}`); 
                if(pull.name){
                    count++;
                    client.commands.set(pull.name, pull);
                } else {
                    continue;
                }
            }
        });
        
        const embed = new EmbedBuilder()
            .setTitle('Help command')
            .setDescription(`Danh sách lệnh cho bot **[ - ] Hehe Bot**\n Prefix của bot là: - \nTổng lệnh bot có: ${count}`)
            .setColor('Blue')
            .addFields([
                {
                    name: 'Danh sách lệnh:',
                    value: '`help` `anime` `avatar` `instagram` `lol` `ping` `say` `val` `valm`',
                    inline: false
                }
            ])
        message.channel.send({embeds :[embed]})
        
    }
}