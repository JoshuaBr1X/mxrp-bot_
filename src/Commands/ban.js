import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from "discord.js";

function parseTime(time) {
  const match = time.match(/^(\d+)(m|d|M|a)$/);
  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "m":
      return value * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    case "M":
      return value * 30.44 * 24 * 60 * 60 * 1000;
    case "a":
      return value * 365.25 * 24 * 60 * 60 * 1000;
    default:
      return null;
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("👥 Da ban a un usuario")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("El usuario a banear")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setDescription("Motivo del baneo")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("tiempo")
        .setDescription("Tiempo del baneo (ejemplo: 1d, 1h)")
        .setRequired(true),
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const { options } = interaction;
    const user = options.getUser("usuario");
    const reason = options.getString("motivo");
    const time = options.getString("tiempo");

    const banDuration = parseTime(time);

    if (!banDuration) {
      return interaction.reply({
        content: "Formato no valido, prueba 1m,1d etc...",
        flgas: "Ephemeral",
      });
    }

    try {
      await interaction.guild.members.ban(user, { reason, days: 7 });

      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("BAN")
        .addFields(
          { name: "Usuario:", value: user.tag, inline: true },
          { name: "Motivo:", value: reason, inline: true },
          { name: "Tiempo:", value: time, inline: true },
        )
        .setFooter({ text: "MXRP DV" + interaction.user.tag })
        .setTimestamp();

      return interaction.reply({
        embeds: [embed],
        flgas: "Ephemeral",
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Error al dar BAN",
        flgas: "Ephemeral",
      });
    }
  },
};
