const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('despedir')
        .setDescription('📄 sacar sytaffs')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a despedir')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario');
        const miembro = await interaction.guild.members.fetch(usuario.id);
        const rolPersonal = '1365539398048813126';

        await miembro.roles.remove(rolPersonal);

        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(`❌ ${usuario} destituido del staffs`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};