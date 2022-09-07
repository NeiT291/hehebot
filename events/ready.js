module.exports = (client) => {
    console.log(`${client.user.username} sẵn sàng!`);
    client.user.setPresence({ activities: [{ name: 'with tình cảm' }], status: 'idle' });
}