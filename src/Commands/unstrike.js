import { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("unstrike")
    .setDescription("✅ Retirar Strike")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("User a retirar striker")
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
    const strikeRol = "1365541686075461724";
    const canalLogs = "1365541872524853291";

    await miembro.roles.remove(strikeRol);

    const embed = new EmbedBuilder()
      .setColor("#00FF7F")
      .setTitle("UnStrike")
      .addFields(
        { name: "Usuario", value: `${usuario}`, inline: true },
        { name: "Staff", value: `${interaction.user}`, inline: true },
      )
      .setTimestamp();

    const canal = await interaction.guild.channels.fetch(canalLogs);
    if (canal?.type === ChannelType.GuildText) {
      await canal.send({ embeds: [embed] });
    }

    await interaction.reply({
      content: `Strike retirado a ${usuario}`,
     flgas: "Ephemeral",
    });
  },
};
