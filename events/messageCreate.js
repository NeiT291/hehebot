module.exports = (client, message) => {
    if(message.author.bot) return;

    const prefix = '-';
    switch (message.content.toLowerCase()) {
        case '?':
            message.reply(`Hỏi cl à 👺`);
            break;
        case 'bot ngu':
            message.reply(`Ngu cái dmm 😡`);
            break;
        case 'tuấn anh':
            message.channel.send(`Tuấn Anh ngu!`);
            break;
        case 'minh':
            message.channel.send('Minh ngu!');
            break;
        case 'nhi':
            message.channel.send(`Nhi cute 😘`);
            break;
        default:
            break;
    }

    if(!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);
}