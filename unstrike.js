const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unstrike')
        .setDescription('✅ Retirar Strike')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('User a retirar striker')
                .setRequired(true)),
    async execute(interaction) {
        const staffRol = '1365539398048813126';
        if (
            !interaction.member.roles.cache.has(staffRol) &&
            !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
        ) {
            return interaction.reply({ content: 'Sin permisos', ephemeral: true });
        }

        const usuario = interaction.options.getUser('usuario');
        const miembro = await interaction.guild.members.fetch(usuario.id);
        const strikeRol = '1365541686075461724';
        const canalLogs = '1365541872524853291';

        await miembro.roles.remove(strikeRol);

        const embed = new EmbedBuilder()
            .setColor('#00FF7F')
            .setTitle('UnStrike')
            .addFields(
                { name: 'Usuario', value: `${usuario}`, inline: true },
                { name: 'Staff', value: `${interaction.user}`, inline: true }
            )
            .setTimestamp();

        const canal = await interaction.guild.channels.fetch(canalLogs);
        if (canal?.type === ChannelType.GuildText) {
            await canal.send({ embeds: [embed] });
        }

        await interaction.reply({ content: `Strike retirado a ${usuario}`, ephemeral: true });
    },
};