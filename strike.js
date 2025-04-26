const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('strike')
        .setDescription('⚠️ Aplicale strike a un user')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a strikear')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('razon')
                .setDescription('Razon del strike')
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
        const razon = interaction.options.getString('razon');
        const miembro = await interaction.guild.members.fetch(usuario.id);
        const strikeRol = '1365541686075461724';
        const canalLogs = '1365541872524853291';

        await miembro.roles.add(strikeRol);

        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('Strike')
            .addFields(
                { name: 'Usuario', value: `${usuario}`, inline: true },
                { name: 'Staff', value: `${interaction.user}`, inline: true },
                { name: 'Razon', value: razon }
            )
            .setTimestamp();

        const canal = await interaction.guild.channels.fetch(canalLogs);
        if (canal?.type === ChannelType.GuildText) {
            await canal.send({ embeds: [embed] });
        }

        await interaction.reply({ content: `Strike dado a ${usuario}`, ephemeral: true });
    },
};