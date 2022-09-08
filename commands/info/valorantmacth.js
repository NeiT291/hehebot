const { EmbedBuilder} = require('discord.js')
const  ValorantAPI  = require('unofficial-valorant-api')
module.exports = {
    name: 'valmactch',
    category: 'info',
    aliases: ['valm'],
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
            const puuid = user.data.puuid;

            const userMMRHistory = await VAPI.getMMRHistory({
                region: region,
                name: nameIg,
                tag: tagIg,
            })

            const eloChange = userMMRHistory.data;

            const matchData = await VAPI.getMatches({
                region: region,
                name: nameIg,
                tag: tagIg,
                filter: 'competitive'
            })

            let index = 0;

            for(const match of matchData.data){
                let playerData;
                for(const player of match.players.all_players){
                    if(puuid === player.puuid){
                        playerData = player;
                    } else continue;
                }
                
                let color;
                if(eloChange[index + 1].mmr_change_to_last_game < 0){
                    color = 'Red';
                }else {
                    color = 'Green';
                }
                index++;

                const embed = new EmbedBuilder()
                    .setTitle('MATCH HISTORY')
                    .setDescription(`${nameIg}#${tagIg}`)
                    .setColor(color)
                    .setThumbnail(playerData.assets.agent.small)
                    .addFields([
                        {
                            name: `Server: ${match.metadata.cluster} | Map: ${match.metadata.map} | Total round: ${match.metadata.rounds_played}\nChampion: ${playerData.character} | Rank: ${playerData.currenttier_patched} | KDA: ${playerData.stats.kills}/${playerData.stats.deaths}/${playerData.stats.assists}\nElo change: ${eloChange[index].mmr_change_to_last_game}`,
                            value: `Được yêu cầu bởi ${message.member.user.username}`
                        }
                    ])
                    message.channel.send({embeds: [embed]})
            }
            
        } catch (error) {
            message.channel.send("Hãy thử lại!");
            console.log(error);
        }
    }
}