import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import functions from "../../../utilities/structs/functions.js";
import log from "../../../utilities/structs/log.js";
import Users from '../../../model/user.js';
import crypto from 'crypto';
export const data = new SlashCommandBuilder()
    .setName('make-account')
    .setDescription('Creates an account for you');
function generatePassword(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const bytes = crypto.randomBytes(length);
    return Array.from(bytes)
        .map(byte => characters[byte % characters.length])
        .join('');
}
export async function execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const discordId = interaction.user.id;
    const username = interaction.user.username;
    const email = `${username}@momentum.com`;
    const password = generatePassword(16);
    try {
        const user = await Users.findOne({ discordId });
        if (user) {
            return interaction.editReply({
                content: "You are already registered!"
            });
        }
        // Create the account.
        const res = await functions.registerUser(discordId, username, email, password, false);
        if (!res) {
            return interaction.editReply({
                content: "Failed to create your account."
            });
        }
        try {
            const credentialEmbed = new EmbedBuilder()
                .setTitle("More Momentum Account Created")
                .setDescription("Your More Momentum account has been successfully created.")
                .addFields({
                name: "Email",
                value: `\`${email}\``,
                inline: false
            }, {
                name: "Password",
                value: `\`${password}\``,
                inline: false
            }, {
                name: "Username",
                value: `\`${username}\``,
                inline: false
            })
                .setColor("#2b2d31")
                .setFooter({
                text: "More-Momentum",
                iconURL: "https://cdn.discordapp.com/app-assets/432980957394370572/1084188429077725287.png",
            })
                .setTimestamp();
            await interaction.user.send({
                embeds: [credentialEmbed]
            });
            await interaction.editReply({
                content: "Your account has been created! I've sent your credentials to you via DM."
            });
        }
        catch (dmError) {
            log.error(dmError);
            await interaction.editReply({
                content: "Your account was created, but I couldn't DM you. Please enable your DMs and contact an administrator."
            });
        }
        const publicEmbed = new EmbedBuilder()
            .setTitle("New registration")
            .setDescription("A new user has registered")
            .addFields({
            name: "Username",
            value: username,
        })
            .setColor("#2b2d31")
            .setFooter({
            text: "More-Momentum",
            iconURL: "https://cdn.discordapp.com/app-assets/432980957394370572/1084188429077725287.png",
        })
            .setTimestamp();
        await interaction.channel?.send({
            embeds: [publicEmbed]
        });
    }
    catch (err) {
        log.error(err);
        await interaction.editReply({
            content: "Something went wrong while creating your account."
        });
    }
}
//# sourceMappingURL=make-account.js.map