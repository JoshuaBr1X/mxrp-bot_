const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contrato')
        .setDescription('📄 contrata un staff')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a contratar')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario');
        const miembro = await interaction.guild.members.fetch(usuario.id);
        const rolPersonal = '1365539398048813126';

        await miembro.roles.add(rolPersonal);

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription(`✅ ${usuario} contratado como personal del servidor`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};