import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("🎖️ Saca al usuario del BAN")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option.setName("id").setDescription("ID del usuario").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setDescription("Por qué le das Unban")
        .setRequired(true),
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const userId = options.getString("id");
    const reason = options.getString("motivo");

    if (!/^\d+$/.test(userId)) {
      return interaction.reply({
        content: "ID invalida",
        flags: "Ephemeral",
      });
    }

    try {
      const bans = await interaction.guild.bans.fetch();
      const user = bans.get(userId);

      if (!user) {
        return interaction.reply({
          content: "No se ubico el usuario y/o ID",
         flgas: "Ephemeral",
        });
      }

      await interaction.guild.members.unban(userId, reason);

      const embed = new EmbedBuilder()
        .setColor("#90EE90")
        .setTitle("🎖️ Usuario unban")
        .addFields(
          { name: "Usuario:", value: user.user.tag, inline: true },
          { name: "Motivo:", value: reason, inline: true },
        )
        .setFooter({ text: "MXRP DV  " + interaction.user.tag })
        .setTimestamp();

      return interaction.reply({
        embeds: [embed],
       flgas: "Ephemeral",
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Error al Unban, verifica que sea la ID correcta",
       flgas: "Ephemeral",
      });
    }
  },
};
