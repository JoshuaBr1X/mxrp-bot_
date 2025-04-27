const {
  PermissionFlagsBits,
  EmbedBuilder,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

export default {
  data: new SlashCommandBuilder()
    .setName("borrar")
    .setDescription("💸 Purgea mensajes inecesarios")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("cantidad")
        .setDescription("Di cuantos mensajes deseas borrar")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    )
    .addStringOption((option) =>
      option
        .setName("razon")
        .setDescription("Pa que los borras")
        .setRequired(false),
    ),

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const { options } = interaction;

    const cantidad = options.getInteger("cantidad");
    const razon = options.getString("razon") || "No hayt razon";

    try {
      const messages = await interaction.channel.messages.fetch({
        limit: cantidad,
      });

      await interaction.channel.bulkDelete(messages, true);

      const embed = new EmbedBuilder()
        .setColor("#FF5733")
        .setTitle("Delete Mensajes")
        .addFields(
          { name: "Mensajes borrados:", value: `${cantidad}`, inline: true },
          { name: "Por:", value: razon, inline: true },
        )
        .setFooter({ text: "MXRP DV " + interaction.user.tag })
        .setTimestamp();

      return interaction.reply({
        embeds: [embed],
        flgas: "Ephemeral",
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Error...",
        flgas: "Ephemeral",
      });
    }
  },
};
