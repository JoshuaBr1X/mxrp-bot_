const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('🔍 Dale kick a un miembro de la comunidad')
        .addUserOption(option =>
            option.setName('usuario').setDescription('Usuario kicked').setRequired(true))
        .addStringOption(option =>
            option.setName('razon').setDescription('Razón de kick').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('usuario');
        const reason = interaction.options.getString('razon') || 'No hay razon';

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({
                content: 'Sin permisos',
                ephemeral: true
            });
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({
                content: 'No puedes kicked a ti mismo',
                ephemeral: true
            });
        }

        try {
            await interaction.guild.members.kick(user, { reason });

            const embed = new EmbedBuilder()
                .setColor('#FFA500')
                .setTitle('User Kicked')
                .addFields(
                    { name: 'Usuario:', value: user.tag, inline: true },
                    { name: 'ID del Usuario:', value: user.id, inline: true },
                    { name: 'Razón:', value: reason, inline: true }
                )
                .setFooter({ text: 'MXRP DV ' + interaction.user.tag })
                .setTimestamp();

            return interaction.reply({
                embeds: [embed],
                ephemeral: false
            });

        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Error al sacar al usuario',
                ephemeral: true
            });
        }
    }
};