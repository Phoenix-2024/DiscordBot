import { Interaction } from 'discord.js';
import { ExtendedClient } from '../typings/ExtendedClient'; // adjust path if needed

export const name = 'interactionCreate';
export const once = false;

export async function execute(interaction: Interaction, client: ExtendedClient) {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: '❌ Something went wrong.', ephemeral: true });
        } else {
            await interaction.reply({ content: '❌ Something went wrong.', ephemeral: true });
        }
    }
}
