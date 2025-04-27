import { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("encuesta")
    .setDescription("💗 Crea una encuesta")
    .addStringOption((option) =>
      option
        .setName("pregunta")
        .setDescription("Qué deseas preguntar")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("opcion1").setDescription("1 opción").setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("opcion2").setDescription("2 opción").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("tiempo")
        .setDescription("Duración (ej: 1m, 1h, 1d, 1M, 1a)")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("opcion3").setDescription("3 opción").setRequired(false),
    )
    .addStringOption((option) =>
      option.setName("opcion4").setDescription("4 opción").setRequired(false),
    )
    .addStringOption((option) =>
      option.setName("opcion5").setDescription("5 opción").setRequired(false),
    ),
    /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const pregunta = options.getString("pregunta");
    const opcion1 = options.getString("opcion1");
    const opcion2 = options.getString("opcion2");
    const opcion3 = options.getString("opcion3");
    const opcion4 = options.getString("opcion4");
    const opcion5 = options.getString("opcion5");
    const tiempo = options.getString("tiempo");

    let tiempoMS = 0;
    if (tiempo.endsWith("m")) tiempoMS = parseInt(tiempo) * 60000;
    else if (tiempo.endsWith("h")) tiempoMS = parseInt(tiempo) * 3600000;
    else if (tiempo.endsWith("d")) tiempoMS = parseInt(tiempo) * 86400000;
    else if (tiempo.endsWith("M")) tiempoMS = parseInt(tiempo) * 2629800000;
    else if (tiempo.endsWith("a")) tiempoMS = parseInt(tiempo) * 31557600000;
    else
      return interaction.reply({
        content: "Formato de tiempo inválido.",
        flgas: "Ephemeral",
      });

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("encuesta_seleccion")
      .setPlaceholder("Selecciona tu respuesta")
      .addOptions([
        { label: opcion1, value: "1" },
        { label: opcion2, value: "2" },
        { label: opcion3, value: "3" },
        { label: opcion4, value: "4" },
        { label: opcion5, value: "5" },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setColor("#FF8C00")
      .setTitle("📊 Encuesta")
      .setDescription(pregunta)
      .addFields(
        { name: "Opciones", value: options.map((opt, i) => `${i + 1}. ${opt.label}`).join("\n") },
        { name: "Duración", value: tiempo },
      )
      .setFooter({ text: "MXRP DV " + interaction.user.tag })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], components: [row] });
    const encuestaMessage = await interaction.fetchReply();

    const respuestas = {};
    const votantes = new Set();

    const collector = encuestaMessage.createMessageComponentCollector({
      time: tiempoMS,
    });

    collector.on("collect", async (i) => {
      if (votantes.has(i.user.id)) {
        return i.reply({ content: "Ya has votado.", flgas: "Ephemeral" });
      }
      votantes.add(i.user.id);
      const value = i.values[0];
      respuestas[value] = (respuestas[value] || 0) + 1;
      await i.reply({
        content: `Tu voto: ${options.find((o) => o.value === value).label}`,
        flgas: "Ephemeral",
      });
    });

    collector.on("end", async () => {
      const resultados = options
        .map((opt) => {
          const count = respuestas[opt.value] || 0;
          return `${opt.label}: ${count} votos`;
        })
        .join("\n");

      const resultEmbed = new EmbedBuilder()
        .setColor("#32CD32")
        .setTitle("📊 Resultados de la encuesta")
        .setDescription(pregunta)
        .addFields({ name: "Resultados", value: resultados })
        .setFooter({ text: "Encuesta finalizada" })
        .setTimestamp();

      await encuestaMessage.edit({ embeds: [resultEmbed], components: [] });
    });
  },
};
