module.exports = {
    name: 'ping',
    category: 'info',
    aliases: ['p'],
    run: (client, message, args) => {
        message.reply(`🎶 pong ${client.ws.ping}ms\n`);       
    }
}