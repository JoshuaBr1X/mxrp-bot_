import { Events, EmbedBuilder, ChannelType } from "discord.js";

export default {
  name: Events.MessageUpdate,
  /**
   * @param {Message} oldMsg
   * @param {Message} newMsg
   * @param {Client} client
   */
  async execute(oldMsg, newMsg, client) {
    try {
      let LOG_CHANNEL_ID = "1365552615101829141";
      if (!newMsg.guild || newMsg.partial || newMsg.author.bot) return;

      const Log = new EmbedBuilder()
        .setColor("#00FF7F")
        .setTitle("Mensaje Update")
        .addFields(
          {
            name: "Creador",
            value: newMsg.author?.tag || "Invalido",
            inline: true,
          },
          { name: "Chat", value: `<#${newMsg.channel.id}>`, inline: true },
          { name: "Ante", value: oldMsg.content || "N/A" },
          { name: "Despues", value: newMsg.content || "N/A" },
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
