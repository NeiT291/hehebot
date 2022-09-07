const { getAudioUrl } = require('google-tts-api');
const { category } = require('../info/help');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer,createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
    name: 'say',
    category: 'fun',
    aliases: ['s'],
    run: async (client , message, args) => {
        if(!args[0]) return message.channel.send('Hãy nhập điều bạn muốn nói');
        const string = args.join(' ');
        if (string.length > 200) return message.channel.send('Hãy nhập dưới 200 ký tự');

        const audioURL = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });
        
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        
        const resource = createAudioResource(audioURL);
        player.play(resource);

        try {
            const voiceChannel = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.voice.channel.guild.id,
                adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
            });

            const subscription = voiceChannel.subscribe(player);
            if (subscription) {
                setTimeout(() => subscription.unsubscribe(), 5_000);
            }   
        }
        catch (e) {
            message.channel.send('Vào room voice thì tao mới nói được');
        }
    },
}