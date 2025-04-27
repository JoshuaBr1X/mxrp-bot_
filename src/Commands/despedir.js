import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("despedir")
    .setDescription("📄 sacar sytaffs")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario a despedir")
        .setRequired(true),
    ),
    /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const usuario = options.getUser("usuario");
    const miembro = await interaction.guild.members.fetch(usuario.id);
    const rolPersonal = "1365539398048813126";

    await miembro.roles.remove(rolPersonal);

    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setDescription(`❌ ${usuario} destituido del staffs`);

    await interaction.reply({ embeds: [embed], flgas: "Ephemeral" });
  },
};
