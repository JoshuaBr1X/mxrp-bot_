const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");

export default {
  data: new SlashCommandBuilder()
    .setName("contrato")
    .setDescription("📄 contrata un staff")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario a contratar")
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

    await miembro.roles.add(rolPersonal);

    const embed = new EmbedBuilder()
      .setColor("#00FF00")
      .setDescription(`✅ ${usuario} contratado como personal del servidor`);

    await interaction.reply({ embeds: [embed], flgas: "Ephemeral" });
  },
};
