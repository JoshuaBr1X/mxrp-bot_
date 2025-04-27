import { Events, EmbedBuilder, ChannelType } from "discord.js";

export default {
  name: Events.MessageDelete,
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    try {
      let LOG_CHANNEL_ID = "1365552615101829141";
      if (!message.guild || message.partial || message.author.bot) return;

      const Log = new EmbedBuilder()
        .setColor("#00FF7F")
        .setTitle("Mensaje Delete")
        .addFields(
          {
            name: "Creador",
            value: message.author?.tag || "Invalido",
            inline: true,
          },
          { name: "Chat", value: `<#${message.channel.id}>`, inline: true },
          { name: "Content", value: message.content || "N/A" },
        )
        .setTimestamp();

      const channel = await client.channels.fetch(LOG_CHANNEL_ID);
      if (channel?.type === ChannelType.GuildText) {
        await channel.send({ embeds: [Log] });
      }

      // Aqui se detecto intervencion de IA.
    } catch (error) {
      return console.error(error);
    }
  },
};
