const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('borrar')
        .setDescription('💸 Purgea mensajes inecesarios')
        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('Di cuantos mensajes deseas borrar')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100))
        .addStringOption(option =>
            option.setName('razon')
                .setDescription('Pa que los borras')
                .setRequired(false)),
    async execute(interaction) {
        const cantidad = interaction.options.getInteger('cantidad');
        const razon = interaction.options.getString('razon') || 'No hayt razon';

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                content: 'Sin permisos',
                ephemeral: true
            });
        }

        try {
            const messages = await interaction.channel.messages.fetch({ limit: cantidad });

            await interaction.channel.bulkDelete(messages, true);

            const embed = new EmbedBuilder()
                .setColor('#FF5733')
                .setTitle('Delete Mensajes')
                .addFields(
                    { name: 'Mensajes borrados:', value: `${cantidad}`, inline: true },
                    { name: 'Por:', value: razon, inline: true }
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
                content: 'Error...',
                ephemeral: true
            });
        }
    }
};