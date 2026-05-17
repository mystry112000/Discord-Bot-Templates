const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,  // Required for welcome events
  ]
});

client.once('ready', () => {
  console.log(`✅ Welcome Bot logged in as ${client.user.tag}`);
});

// When a new member joins
client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
  if (!channel) return;

  // Auto-assign role
  if (process.env.AUTO_ROLE_ID) {
    try {
      await member.roles.add(process.env.AUTO_ROLE_ID);
    } catch (err) {
      console.log('Could not assign auto-role');
    }
  }

  // Welcome embed
  const embed = {
    color: 0x22c55e,
    title: `👋 Welcome, ${member.user.username}!`,
    description: `Hey <@${member.user.id}>, welcome to **${member.guild.name}**!\n\nCheck out <#${channel.id}> to get started.\nWe're glad to have you here! 🎉`,
    thumbnail: { url: member.user.displayAvatarURL() },
    fields: [
      { name: '📅 Account Created', value: member.user.createdAt.toDateString(), inline: true },
      { name: '👥 Member Count', value: `${member.guild.memberCount}`, inline: true },
    ],
    footer: { text: `ID: ${member.user.id}` },
    timestamp: new Date(),
  };

  channel.send({ embeds: [embed] });

  // Also send a DM to the new member
  try {
    await member.send(`Hey ${member.user.username}! 👋\nWelcome to **${member.guild.name}**! We're happy to have you. Make sure to read the rules and introduce yourself!`);
  } catch {
    // DMs might be closed
  }
});

// When a member leaves
client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
  if (!channel) return;

  const embed = {
    color: 0xef4444,
    title: `👋 ${member.user.username} left`,
    description: `**${member.user.tag}** has left the server.`,
    thumbnail: { url: member.user.displayAvatarURL() },
    fields: [
      { name: '👥 Member Count', value: `${member.guild.memberCount}`, inline: true },
    ],
    timestamp: new Date(),
  };

  channel.send({ embeds: [embed] });
});

// Custom welcome message command
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!setwelcome') {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ Only admins can set the welcome channel.');
    }
    // Update .env — simple approach: save to a JSON file
    const fs = require('fs');
    const configPath = './config.json';
    let config = {};
    try { config = JSON.parse(fs.readFileSync(configPath)); } catch {}
    config.welcomeChannel = message.channel.id;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    message.reply(`✅ Welcome messages will be sent to ${message.channel}!`);
  }

  if (message.content === '!goodbye') {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ Only admins can use this.');
    }
    const fs = require('fs');
    const configPath = './config.json';
    let config = {};
    try { config = JSON.parse(fs.readFileSync(configPath)); } catch {}
    config.goodbyeChannel = message.channel.id;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    message.reply(`✅ Goodbye messages will be sent to ${message.channel}!`);
  }
});

client.login(process.env.TOKEN);
