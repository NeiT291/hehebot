const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'lol',
    category: 'info',
    run: (client, message, args) => {
        const name = args[0];
        const region = args[1];
        const options = {
            method: 'GET',
            url: `https://lol_stats.p.rapidapi.com/${region}/${name}`,
            headers: {
              'X-RapidAPI-Key': '6ac63ed2fcmshee4f4aed274cc12p157d22jsnf8d09d80489c',
              'X-RapidAPI-Host': 'lol_stats.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            const rank = response.data.soloQ.trim().split(' ');           
            var rankIMG = '';
            switch (rank[0]) {
                case 'Iron':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/1.png?v=8';
                    break;
                case 'Bronze':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=8';
                    break;
                case 'Silver':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=8';
                    break;
                case 'Gold':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=8';
                    break;
                case 'Platinum':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=8';
                    break;
                case 'Diamond':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/6.png?v=8';
                    break;
                case 'Master':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/7.png?v=8';
                    break;
                case 'GrandMaster':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/8.png?v=8';
                    break;
                case 'Challenger':
                    rankIMG = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/9.png?v=8';
                    break;
            };
            const rankSolo = response.data.soloQ;
            
            const embed = new EmbedBuilder()
                .setTitle(`${name} LOL information`)
                .setColor('Blurple')
                .setThumbnail(rankIMG)
                .addFields([
                    {
                        name: `Rank: ${rank[0]}`,
                        value: '----------\nMatch recent:',
                        inline: false
                    },
                    {
                        name: `MATCH 1`,
                        value: `Champion: ${response.data.mostPlayedChamps[0].champName}\n
                                KDA: ${response.data.mostPlayedChamps[0].kda}\n
                                Winrate ${response.data.mostPlayedChamps[0].winrate}\n
                                Total: ${response.data.mostPlayedChamps[0].totalGames}`,
                        inline: true
                    },
                    {
                        name: `MATCH 2`,
                        value: `Champion: ${response.data.mostPlayedChamps[1].champName}\n
                                KDA: ${response.data.mostPlayedChamps[1].kda}\n
                                Winrate ${response.data.mostPlayedChamps[1].winrate}\n
                                Total: ${response.data.mostPlayedChamps[1].totalGames}`,
                        inline: true
                    },
                    {
                        name: `MATCH 3`,
                        value: `Champion: ${response.data.mostPlayedChamps[2].champName}\n
                                KDA: ${response.data.mostPlayedChamps[2].kda}\n
                                Winrate ${response.data.mostPlayedChamps[2].winrate}\n
                                Total: ${response.data.mostPlayedChamps[2].totalGames}`,
                        inline: true
                    },
                    {
                        name: `MATCH 4`,
                        value: `Champion: ${response.data.mostPlayedChamps[3].champName}\n
                                KDA: ${response.data.mostPlayedChamps[3].kda}\n
                                Winrate ${response.data.mostPlayedChamps[3].winrate}\n
                                Total: ${response.data.mostPlayedChamps[3].totalGames}`,
                        inline: true
                    },
                    {
                        name: `MATCH 5`,
                        value: `Champion: ${response.data.mostPlayedChamps[4].champName}\n
                                KDA: ${response.data.mostPlayedChamps[4].kda}\n
                                Winrate ${response.data.mostPlayedChamps[4].winrate}\n
                                Total: ${response.data.mostPlayedChamps[4].totalGames}`,
                        inline: true
                    },
                    {
                        name: `MATCH 5`,
                        value: `Champion: ${response.data.mostPlayedChamps[5].champName}\n
                                KDA: ${response.data.mostPlayedChamps[5].kda}\n
                                Winrate ${response.data.mostPlayedChamps[5].winrate}\n
                                Total: ${response.data.mostPlayedChamps[5].totalGames}`,
                        inline: true
                    }
                ])
            message.channel.send({embeds: [embed]});
          }).catch(function (error) {
            
            message.reply('Hãy nhập khu vực sau tên:\n`na1` `euw1` `eun1` `kr1` `br1`\n`jp1` `ru1` `oc1` `tr` `la1` `la2`')
          });
    }
}