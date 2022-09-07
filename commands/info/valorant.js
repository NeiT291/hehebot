const { EmbedBuilder} = require('discord.js')
const  ValorantAPI  = require('unofficial-valorant-api')
module.exports = {
    name: 'valorant',
    category: 'info',
    aliases: ['val'],
    run: async (client, message, args) => {
        const nameAndTag = message.content.slice(5);
        const index = nameAndTag.indexOf('#');
        const name = nameAndTag.slice(0,index);
        const tag = nameAndTag.slice(index + 1);
        const VAPI = new ValorantAPI();

        try {
            const user = await VAPI.getAccount({
                name: name,
                tag: tag,
            })

            const nameIg = user.data.name;
            const tagIg = user.data.tag;
            const region = user.data.region;

            const userMMR = await VAPI.getMMR({
                version: 'v2',
                region: region,
                name: nameIg,
                tag: tagIg,
            })
            const level = user.data.account_level;
            const rank = userMMR.data.current_data.currenttierpatched;
            const rankIMG = userMMR.data.current_data.images.small;
            const elo = userMMR.data.current_data.elo;
            const winRate =( userMMR.data.by_season.e5a2.wins / userMMR.data.by_season.e5a2.number_of_games )* 100;
            const eloLastChange = userMMR.data.current_data.mmr_change_to_last_game;
            
            const embed = new EmbedBuilder()
                .setTitle(`PROFILE VALORANT`)
                .setDescription(`${nameIg}#${tagIg}`)
                .setThumbnail(rankIMG)
                .setColor('Red')
                .setImage(user.data.card.wide)
                .addFields([
                    {
                        name: `Level: ${level}\nRank: ${rank}\nElo: ${elo % 100}/100\nElo last change: ${eloLastChange}\nWinrate: ${winRate.toFixed(2)}%`,
                        value: `Được yêu cầu bởi ${message.member.user.username}`
                    }
                ])
                message.channel.send({embeds : [embed]})
        
        } catch (error) {
            message.channel.send("Hãy thử lại!");
            console.log(error);
        }
    }
}