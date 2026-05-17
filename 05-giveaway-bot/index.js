const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Store active giveaways
const giveaways = new Map();

client.once('ready', () => {
  console.log(`✅ Giveaway Bot logged in as ${client.user.tag}`);
});

function hasPermission(member) {
  return member.roles.cache.has(process.env.GIVEAWAY_ROLE_ID)
    || member.permissions.has(PermissionFlagsBits.Administrator);
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const args = message.content.split(' ');
  const cmd = args[0].toLowerCase();

  // Start a giveaway: !giveaway 1h Discord Nitro
  if (cmd === '!giveaway') {
    if (!hasPermission(message.member)) {
      return message.reply('❌ You need the giveaway role to use this.');
    }

    const timeStr = args[1];
    const prize = args.slice(2).join(' ');

    if (!timeStr || !prize) {
      return message.reply('Usage: `!giveaway 1h Discord Nitro`');
    }

    // Parse time (supports: 30s, 5m, 2h, 1d)
    const timeMatch = timeStr.match(/^(\d+)(s|m|h|d)$/);
    if (!timeMatch) return message.reply('Use format like: `30s`, `5m`, `2h`, `1d`');

    const amount = parseInt(timeMatch[1]);
    const unit = timeMatch[2];
    const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    const duration = amount * multipliers[unit];

    const endTime = Date.now() + duration;

    const embed = {
      color: 0x22c55e,
      title: '🎉 GIVEAWAY',
      description: `**${prize}**\n\nReact with 🎉 to enter!\nEnds: <t:${Math.floor(endTime / 1000)}:R>`,
      footer: { text: `Hosted by ${message.author.username}` },
    };

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react('🎉');

    const giveawayId = `${message.guild.id}-${msg.id}`;
    giveaways.set(giveawayId, {
      prize, endTime, channel: message.channel.id, msgId: msg.id,
      host: message.author.id, ended: false,
    });

    // Set timer
    setTimeout(async () => {
      if (giveaways.get(giveawayId)?.ended) return;

      const fetched = await msg.channel.messages.fetch(msg.id);
      const reaction = fetched.reactions.cache.get('🎉');
      let users = [];
      if (reaction) {
        const fetchedUsers = await reaction.users.fetch();
        users = fetchedUsers.filter(u => !u.bot).map(u => u);
      }

      if (users.length === 0) {
        return msg.channel.send(`❌ No one entered the giveaway for **${prize}**`);
      }

      const winner = users[Math.floor(Math.random() * users.length)];
      msg.channel.send(`🎉 **${winner}** won **${prize}**! Congratulations!`);
      const newEmbed = { ...embed, color: 0xef4444, title: '🎉 GIVEAWAY ENDED', description: `**${prize}**\n\nWinner: ${winner}` };
      await msg.edit({ embeds: [newEmbed] });
      giveaways.set(giveawayId, { ...giveaways.get(giveawayId), ended: true });
    }, duration);

    message.delete();
  }

  // End a giveaway early: !end-giveaway <message-id>
  if (cmd === '!endgiveaway') {
    if (!hasPermission(message.member)) return message.reply('❌ No permission.');
    const msgId = args[1];
    if (!msgId) return message.reply('Usage: `!endgiveaway <message-id>`');
    // Find the giveaway
    for (const [id, data] of giveaways) {
      if (data.msgId === msgId && !data.ended) {
        giveaways.set(id, { ...data, ended: true });
        return message.reply(`✅ Giveaway for **${data.prize}** ended early.`);
      }
    }
    message.reply('❌ Giveaway not found or already ended.');
  }

  // Reroll: !reroll <message-id>
  if (cmd === '!reroll') {
    if (!hasPermission(message.member)) return message.reply('❌ No permission.');
    const msgId = args[1];
    if (!msgId) return message.reply('Usage: `!reroll <message-id>`');

    for (const [id, data] of giveaways) {
      if (data.msgId === msgId) {
        const fetched = await (await client.channels.fetch(data.channel)).messages.fetch(msgId);
        const reaction = fetched.reactions.cache.get('🎉');
        let users = [];
        if (reaction) {
          const fetchedUsers = await reaction.users.fetch();
          users = fetchedUsers.filter(u => !u.bot).map(u => u);
        }
        if (users.length === 0) return message.reply('❌ No one to reroll.');
        const winner = users[Math.floor(Math.random() * users.length)];
        return message.channel.send(`🎉 New winner: **${winner}** for **${data.prize}**!`);
      }
    }
    message.reply('❌ Giveaway not found.');
  }
});

client.login(process.env.TOKEN);
