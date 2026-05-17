const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('ready', () => {
  console.log(`✅ Fun Bot logged in as ${client.user.tag}`);
});

// 8ball responses
const ballResponses = [
  'Yes', 'No', 'Maybe', 'Definitely', 'Ask again later',
  'Absolutely not', 'I doubt it', 'Without a doubt', 'Signs point to yes',
  'Very likely', 'Cannot predict now', 'Don\'t count on it',
];

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const cmd = args[0].toLowerCase();

  // 8ball - asks a yes/no question
  if (cmd === '!8ball') {
    const question = args.slice(1).join(' ');
    if (!question) return message.reply('Ask me a question: `!8ball Am I cool?`');
    const answer = ballResponses[Math.floor(Math.random() * ballResponses.length)];
    const embed = {
      color: 0xa855f7,
      title: '🎱 Magic 8Ball',
      fields: [
        { name: 'Question', value: question },
        { name: 'Answer', value: answer },
      ],
    };
    message.channel.send({ embeds: [embed] });
  }

  // Roll dice
  if (cmd === '!roll') {
    const sides = parseInt(args[1]) || 6;
    if (sides < 2 || sides > 100) return message.reply('Use 2-100 sides.');
    const result = Math.floor(Math.random() * sides) + 1;
    message.reply(`🎲 You rolled a **${result}** (1-${sides})`);
  }

  // Coin flip
  if (cmd === '!coinflip' || cmd === '!flip') {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    message.reply(`🪙 **${result}**`);
  }

  // Choose between options
  if (cmd === '!choose') {
    const choices = args.slice(1).join(' ').split(' or ');
    if (choices.length < 2) return message.reply('Give me options: `!choose pizza or burger`');
    const pick = choices[Math.floor(Math.random() * choices.length)];
    message.reply(`🤔 I choose... **${pick}**`);
  }

  // User info
  if (cmd === '!userinfo') {
    const target = message.mentions.users.first() || message.author;
    const embed = {
      color: 0x818cf8,
      title: target.username,
      thumbnail: { url: target.displayAvatarURL() },
      fields: [
        { name: 'ID', value: target.id, inline: true },
        { name: 'Account Created', value: target.createdAt.toDateString(), inline: true },
        { name: 'Bot?', value: target.bot ? 'Yes 🤖' : 'No 🧑', inline: true },
      ],
    };
    message.channel.send({ embeds: [embed] });
  }

  // Server info
  if (cmd === '!serverinfo') {
    const guild = message.guild;
    const embed = {
      color: 0x818cf8,
      title: `📊 ${guild.name}`,
      thumbnail: { url: guild.iconURL() },
      fields: [
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
        { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: 'Created', value: guild.createdAt.toDateString(), inline: true },
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
      ],
    };
    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
