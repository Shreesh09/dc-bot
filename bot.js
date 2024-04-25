const cron = require('node-cron');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const counter = 430; 
const channelId = process.env.DISCORD_CHANNEL_ID; 

client.once('ready', () => {
 console.log('Bot is ready!');

 // Schedule a task to run at midnight every day
 cron.schedule('0 0 * * *', () => {
    console.log('Updating counter...');
    counter += 1; 
    console.log(`Counter updated to: ${counter}`);

    const channel = client.channels.cache.get(channelId);
    if (channel) {
        channel.send(`Day: ${counter}`);
    } else {
        console.log(`Channel with ID ${channelId} not found.`);
    }
 });
});

client.login(process.env.DISCORD_BOT_TOKEN); 
