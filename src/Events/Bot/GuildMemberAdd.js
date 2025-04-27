import { Events, EmbedBuilder, ChannelType } from "discord.js";

export default {
  name: Events.GuildMemberAdd,
  /**
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    try {
      let LOG_CHANNEL_ID = "1365552615101829141";
      const Log = new EmbedBuilder()
        .setColor("Green")
        .setTitle("User entro")
        .setDescription(`${member.user.tag} se unio`)
        .setTimestamp();

      await client.channels.fetch(LOG_CHANNEL_ID).then((channel) => {
        if (channel?.type === ChannelType.GuildText) {
          channel.send({ embeds: [Log] });
        }
      });

      // Esto se puede mejorar ya que no es requerido revisar que tipo de Canal es
    } catch (error) {
      return console.error(error);
    }
  },
};
