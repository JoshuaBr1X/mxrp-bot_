import "module-alias/register";
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import {LoadEvents} from "@Handlers/EventHandler"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.User]
});

LoadEvents(client)

client.login(process.env.TOKEN);