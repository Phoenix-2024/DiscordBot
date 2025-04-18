import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { ExtendedClient } from './typings/ExtendedClient';

dotenv.config();

const client = new ExtendedClient({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.ts')); 

    for (const file of commandFiles) {
        const command = require(path.join(folderPath, file)).default;
        
        if(command?.data && command?.execute) {
            client.commands.set(command.date.name, command);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('ts'));

for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(process.env.TOKEN);