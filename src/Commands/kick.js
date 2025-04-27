import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("🔍 Dale kick a un miembro de la comunidad")
   .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario kicked")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("razon")
        .setDescription("Razón de kick")
        .setRequired(false),
    ),

    /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const user = options.getUser("usuario");
    const reason = options.getString("razon") || "No hay razon";

   
    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: "No puedes kicked a ti mismo",
       flgas: "Ephemeral"
      });
    }

    try {
      await interaction.guild.members.kick(user, { reason });

      const embed = new EmbedBuilder()
        .setColor("#FFA500")
        .setTitle("User Kicked")
        .addFields(
          { name: "Usuario:", value: user.tag, inline: true },
          { name: "ID del Usuario:", value: user.id, inline: true },
          { name: "Razón:", value: reason, inline: true },
        )
        .setFooter({ text: "MXRP DV " + interaction.user.tag })
        .setTimestamp();

      return interaction.reply({
        embeds: [embed],
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Error al sacar al usuario",
       flgas: "Ephemeral"
      });
    }
  },
};
