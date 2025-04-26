const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('🎖️ Saca al usuario del BAN')
        .addStringOption(option =>
            option.setName('id').setDescription('ID del usuario').setRequired(true))
        .addStringOption(option =>
            option.setName('motivo').setDescription('Por qué le das Unban').setRequired(true)),
    async execute(interaction) {
        const userId = interaction.options.getString('id');
        const reason = interaction.options.getString('motivo');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                content: 'Sin permisos',
                ephemeral: true
            });
        }

        if (!/^\d+$/.test(userId)) {
            return interaction.reply({
                content: 'ID invalida',
                ephemeral: true
            });
        }

        try {
            const bans = await interaction.guild.bans.fetch();
            const user = bans.get(userId);

            if (!user) {
                return interaction.reply({
                    content: 'No se ubico el usuario y/o ID',
                    ephemeral: true
                });
            }

            await interaction.guild.members.unban(userId, reason);

            const embed = new EmbedBuilder()
                .setColor('#90EE90')
                .setTitle('🎖️ Usuario unban')
                .addFields(
                    { name: 'Usuario:', value: user.user.tag, inline: true },
                    { name: 'Motivo:', value: reason, inline: true }
                )
                .setFooter({ text: 'MXRP DV  ' + interaction.user.tag })
                .setTimestamp();

            return interaction.reply({
                embeds: [embed],
                ephemeral: false
            });

        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Error al Unban, verifica que sea la ID correcta',
                ephemeral: true
            });
        }
    }
};