require('dotenv').config();

const { Client, GatewayIntentBits, Collection} = require('discord.js');
const  { token }  = process.env;

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates]});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(token);
