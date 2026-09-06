import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import Users from '../../../model/user.js';

const REQUIRED_ROLE_ID = 'DONATOR_ROLE_ID';

export const data = new SlashCommandBuilder()
	.setName('username')
	.setDescription('Change your username [DONATORS ONLY]')
	.addStringOption(option =>
		option.setName('username')
			.setDescription('Your desired username')
			.setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {

	await interaction.deferReply({ ephemeral: true });
	const member = interaction.member;

	if (!member || !('roles' in member)) {
		return interaction.editReply({
			content: "You are not a Donator...."
		});
	}

	if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
		return interaction.editReply({
			content: "You are not a Donator..."
		});
	}

	const user = await Users.findOne({
		discordId: interaction.user.id
	});

	if (!user) {
		return interaction.editReply({
			content: "You are not registered!"
		});
	}

	const accessToken = global.accessTokens.find(
		i => i.accountId == user.accountId
	);

	if (accessToken) {
		return interaction.editReply({
			content: "Failed to change username as you are currently logged in to Fortnite.\nRun the /sign-out-of-all-sessions command to sign out."
		});
	}

	const username = interaction.options.getString('username', true);

	await user.updateOne({
		$set: {
			username: username
		}
	});

	const embed = new EmbedBuilder()
		.setTitle("Username changed")
		.setDescription(`Your account username has been changed to ${username}`)
		.setColor("#2b2d31")
		.setFooter({
			text: "More-Momentum",
			iconURL: "https://cdn.discordapp.com/app-assets/432980957394370572/1084188429077725287.png",
		})
		.setTimestamp();

	await interaction.editReply({
		embeds: [embed]
	});
}
