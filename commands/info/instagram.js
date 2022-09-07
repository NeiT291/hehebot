const axios = require('axios').default;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'instagram',
    category: 'info',
    aliases: ['insta'],
    run: (client, message, args) => {
        if (!args[0]) return message.channel.send('Hãy nhập username instagram!');
        const instaID = args[0];
        const options = {
            method: 'GET',
            url: 'https://instagram130.p.rapidapi.com/account-info',
            params: {username: `${instaID}`},
            headers: {
              'X-RapidAPI-Key': '6ac63ed2fcmshee4f4aed274cc12p157d22jsnf8d09d80489c',
              'X-RapidAPI-Host': 'instagram130.p.rapidapi.com'
            }
          };

        axios.request(options).then(function (response) {
            
            if(response.data.is_private) return message.channel.send('Hãy nhập profile public!!!');
            let bio; 
            if (response.data.biography === '') {
                bio = 'Không có bio';
            } else {
                bio - response.data.biography;
            }
            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(`https://www.instagram.com/${instaID}`)
					    .setLabel('Đi tới profile')
					    .setStyle(ButtonStyle.Link),
                )

            const embed = new EmbedBuilder()
            .setTitle(`Profile instagram của ${response.data.full_name}`)
            .setThumbnail(response.data.profile_pic_url_hd)
            .setDescription(bio)
            .addFields([
                {
                    name: `Số bài đăng: `,
                    value: `${response.data.edge_owner_to_timeline_media.count}`,
                    inline: true,
                },
                {
                    name: `Follower: `,
                    value: `${response.data.edge_followed_by.count}`,
                    inline: true,
                },
                {
                    name: `Following: `,
                    value: `${response.data.edge_follow.count}`,
                    inline: true,
                },
            ])
            .setColor('Yellow')
            .setFooter({text: `Được yêu cầu bởi ${message.member.user.username}`})
            message.channel.send({embeds: [embed], components: [button]});  
        }).catch(function (error) {
            message.channel.send('loi');
            console.error(error);
        })
    }
}