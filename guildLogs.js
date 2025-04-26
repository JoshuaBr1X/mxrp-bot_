const { Events, EmbedBuilder, ChannelType } = require('discord.js');

const LOG_CHANNEL_ID = '1365552615101829141';

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);

        client.on(Events.GuildMemberAdd, member => {
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('User entro')
                .setDescription(`${member.user.tag} se unio`)
                .setTimestamp();

            if (logChannel?.type === ChannelType.GuildText) {
                logChannel.send({ embeds: [embed] });
            }
        });

        client.on(Events.GuildMemberRemove, member => {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('User salio')
                .setDescription(`${member.user.tag}  se ah retirado`)
                .setTimestamp();

            if (logChannel?.type === ChannelType.GuildText) {
                logChannel.send({ embeds: [embed] });
            }
        });

        client.on(Events.MessageDelete, async message => {
            if (!message.guild || message.partial) return;

            const embed = new EmbedBuilder()
                .setColor('Orange')
                .setTitle('Mensaje delete')
                .addFields(
                    { name: 'Creador', value: message.author?.tag || 'invalido', inline: true },
                    { name: 'Chat', value: `<#${message.channel.id}>`, inline: true },
                    { name: 'Content', value: message.content || 'N/A' }
                )
                .setTimestamp();

            if (logChannel?.type === ChannelType.GuildText) {
                logChannel.send({ embeds: [embed] });
            }
        });

        client.on(Events.MessageUpdate, (oldMsg, newMsg) => {
            if (!oldMsg.content || oldMsg.content === newMsg.content || !oldMsg.guild) return;

            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('Mensaje edited')
                .addFields(
                    { name: 'Creador', value: newMsg.author?.tag || 'Invalido', inline: true },
                    { name: 'Chat', value: `<#${newMsg.channel.id}>`, inline: true },
                    { name: 'Ante', value: oldMsg.content },
                    { name: 'Despues', value: newMsg.content }
                )
                .setTimestamp();

            if (logChannel?.type === ChannelType.GuildText) {
                logChannel.send({ embeds: [embed] });
            }
        });
    }
};