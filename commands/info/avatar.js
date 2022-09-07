const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'avatar',
    category: 'info',
    aliases: ['ava'],
    run: (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const avatar = member.displayAvatarURL({format: 'png', size: 1024, dynamic: true});
        const embed = new EmbedBuilder()
            .setTitle(`Đây là avatar của ${member.user.username}`)
            .setImage(avatar)
            .setFooter({text: `Được yêu cầu bởi ${message.member.user.username}`})
        message.channel.send({embeds: [embed]});     
        
    }
}