const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

// Setup database
const db = new Database(path.join(__dirname, 'levels.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS levels (
    user_id TEXT,
    guild_id TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    PRIMARY KEY (user_id, guild_id)
  )
`);

// XP per message and level formula
const XP_PER_MSG = Math.floor(Math.random() * 10) + 5;
function calcLevel(xp) {
  return Math.floor(0.1 * Math.sqrt(xp)) + 1;
}

client.once('ready', () => {
  console.log(`✅ Level Bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const stmt = db.prepare('SELECT * FROM levels WHERE user_id = ? AND guild_id = ?');
  let userData = stmt.get(message.author.id, message.guild.id);

  if (!userData) {
    db.prepare('INSERT INTO levels (user_id, guild_id, xp, level) VALUES (?, ?, ?, ?)')
      .run(message.author.id, message.guild.id, XP_PER_MSG, 1);
    return;
  }

  const newXp = userData.xp + XP_PER_MSG;
  const newLevel = calcLevel(newXp);

  if (newLevel > userData.level) {
    db.prepare('UPDATE levels SET xp = ?, level = ? WHERE user_id = ? AND guild_id = ?')
      .run(newXp, newLevel, message.author.id, message.guild.id);
    message.channel.send(`🎉 Congrats <@${message.author.id}>! You reached level **${newLevel}**!`);
  } else {
    db.prepare('UPDATE levels SET xp = ? WHERE user_id = ? AND guild_id = ?')
      .run(newXp, message.author.id, message.guild.id);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content === '!rank') {
    const data = db.prepare('SELECT * FROM levels WHERE user_id = ? AND guild_id = ?')
      .get(message.author.id, message.guild.id);
    if (!data) return message.reply('Start chatting to earn XP!');

    const embed = {
      color: 0xf59e0b,
      title: `📊 ${message.author.username}'s Rank`,
      thumbnail: { url: message.author.displayAvatarURL() },
      fields: [
        { name: 'Level', value: `${data.level}`, inline: true },
        { name: 'XP', value: `${data.xp}`, inline: true },
      ],
    };
    message.channel.send({ embeds: [embed] });
  }

  if (message.content === '!leaderboard') {
    const rows = db.prepare('SELECT * FROM levels WHERE guild_id = ? ORDER BY level DESC, xp DESC LIMIT 10')
      .all(message.guild.id);
    if (rows.length === 0) return message.reply('No one has earned XP yet!');

    const fields = rows.map((r, i) => ({
      name: `#${i + 1} — <@${r.user_id}>`,
      value: `Level ${r.level} — ${r.xp} XP`,
      inline: false,
    }));

    message.channel.send({
      embeds: [{ color: 0xf59e0b, title: '🏆 Leaderboard', fields }]
    });
  }
});

client.login(process.env.TOKEN);
