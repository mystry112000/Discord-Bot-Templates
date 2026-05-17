const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

client.once('ready', () => {
  console.log(`✅ Mod Bot logged in as ${client.user.tag}`);
});

function hasModRole(member) {
  return member.roles.cache.has(process.env.MOD_ROLE_ID);
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const cmd = args[0].toLowerCase();

  // Clear messages
  if (cmd === '!clear') {
    if (!hasModRole(message.member)) {
      return message.reply('❌ You need the mod role to use this.');
    }
    const amount = parseInt(args[1]);
    if (!amount || amount < 1 || amount > 100) {
      return message.reply('Usage: `!clear <1-100>`');
    }
    const deleted = await message.channel.bulkDelete(amount, true);
    const msg = await message.channel.send(`🗑️ Deleted ${deleted.size} messages.`);
    setTimeout(() => msg.delete(), 3000);
  }

  // Kick a member
  if (cmd === '!kick') {
    if (!hasModRole(message.member)) {
      return message.reply('❌ You need the mod role to use this.');
    }
    const target = message.mentions.members.first();
    if (!target) return message.reply('Mention someone to kick: `!kick @user reason`');

    const reason = args.slice(2).join(' ') || 'No reason given';

    try {
      await target.kick(reason);
      message.channel.send(`👋 Kicked ${target.user.tag} — Reason: ${reason}`);
    } catch (err) {
      message.reply('❌ I cannot kick that user.');
    }
  }

  // Ban a member
  if (cmd === '!ban') {
    if (!hasModRole(message.member)) {
      return message.reply('❌ You need the mod role to use this.');
    }
    const target = message.mentions.members.first();
    if (!target) return message.reply('Mention someone to ban: `!ban @user reason`');

    const reason = args.slice(2).join(' ') || 'No reason given';

    try {
      await target.ban({ reason });
      message.channel.send(`🔨 Banned ${target.user.tag} — Reason: ${reason}`);
    } catch (err) {
      message.reply('❌ I cannot ban that user.');
    }
  }

  // Warn a member (logs to chat)
  if (cmd === '!warn') {
    if (!hasModRole(message.member)) {
      return message.reply('❌ You need the mod role to use this.');
    }
    const target = message.mentions.members.first();
    if (!target) return message.reply('Mention someone to warn: `!warn @user reason`');

    const reason = args.slice(2).join(' ') || 'No reason given';
    message.channel.send(`⚠️ ${target.user.tag} has been warned — Reason: ${reason}`);
  }
});

client.login(process.env.TOKEN);
