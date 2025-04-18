import { Client, Collection, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

// Update the command interface to accept both interaction and client
export interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction, client: Client) => Promise<void>;
}

// ExtendedClient includes a collection of all loaded commands
export class ExtendedClient extends Client {
    commands: Collection<string, Command> = new Collection();
}
