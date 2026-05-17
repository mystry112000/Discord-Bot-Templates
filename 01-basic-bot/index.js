const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Runs when bot is ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  client.user.setActivity('!help for commands', { type: 3 });
});

// Message handler
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // Ping command
  if (message.content === '!ping') {
    message.reply(`🏓 Pong! Latency: ${client.ws.ping}ms`);
  }

  // Say command
  if (message.content.startsWith('!say ')) {
    const text = message.content.slice(5);
    message.channel.send(text);
    message.delete();
  }

  // Avatar command
  if (message.content === '!avatar') {
    message.reply(message.author.displayAvatarURL({ size: 256 }));
  }

  // Help command
  if (message.content === '!help') {
    const helpText = `
**📖 Bot Commands**
\`!ping\` - Check bot latency
\`!say <text>\` - Make the bot say something
\`!avatar\` - Get your profile picture
\`!help\` - Show this message
    `;
    message.channel.send(helpText);
  }
});

// Info command - shows server info
client.on('messageCreate', (message) => {
  if (message.content === '!info' && !message.author.bot) {
    const embed = {
      color: 0x818cf8,
      title: `📊 ${message.guild.name}`,
      fields: [
        { name: 'Members', value: `${message.guild.memberCount}`, inline: true },
        { name: 'Created', value: message.guild.createdAt.toDateString(), inline: true },
        { name: 'Owner', value: `<@${message.guild.ownerId}>`, inline: true },
      ],
      thumbnail: { url: message.guild.iconURL() },
    };
    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
