import { Events } from "discord.js";
import { LoadCommands } from "@Handlers/CommandHandler";

export default {
  name: Events.ClientReady,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log(`Bot ${client.user.tag} iniciado 🔥`);
    await LoadCommands(client);
  },
};
