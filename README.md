# 🤖 Discord Bot Templates

> **6 ready-to-run Discord bot templates** for beginners. Pick one, add your token, and your bot is live in minutes. No experience needed.

---

## 📋 All Templates

| # | Template | What It Does | Level |
|---|----------|-------------|-------|
| 1 | [Basic Bot](01-basic-bot) | Ping, say, avatar, server info, help | ⭐ Beginner |
| 2 | [Moderation Bot](02-moderation-bot) | Kick, ban, warn, clear messages | ⭐⭐ Easy |
| 3 | [Fun Bot](03-fun-bot) | 8ball, dice roll, coinflip, choose, user info | ⭐ Beginner |
| 4 | [Level Bot](04-level-bot) | XP system, level up, rank, leaderboard | ⭐⭐⭐ Medium |
| 5 | [Giveaway Bot](05-giveaway-bot) | Create, end, reroll giveaways | ⭐⭐⭐ Medium |
| 6 | [Welcome Bot](06-welcome-bot) | Welcome/goodbye messages, auto-role, DMs | ⭐⭐ Easy |

---

## 🚀 Beginner's Guide

### Step 1: Install Node.js
Download from https://nodejs.org → install like any program.
Check it worked: open terminal and type `node --version`

### Step 2: Create Your Bot
1. Go to https://discord.com/developers/applications
2. Click **New Application** → name it → **Create**
3. Click **Bot** → **Add Bot** → **Yes, do it!**
4. Click **Reset Token** → **Copy** (this is your bot's password — keep it secret!)
5. Turn ON **Message Content Intent** (required for reading messages)

### Step 3: Invite Bot to Server
1. Click **OAuth2** → **URL Generator**
2. Check **bot** under Scopes
3. Check permissions: Send Messages, Read Message History, and any mod perms you need
4. Copy URL → open in browser → select server → **Authorize**

### Step 4: Run a Template
```bash
# Pick a template
cd 04-level-bot

# Install dependencies (one time)
npm install

# Create .env file
# Rename .env.example to .env and paste your token inside

# Start the bot!
npm start
```

---

## 📖 Template Commands

### 1️⃣ Basic Bot
| Command | What it does |
|---------|-------------|
| `!ping` | Check bot speed |
| `!say <text>` | Bot repeats you |
| `!avatar` | Get your profile pic |
| `!info` | Server info |
| `!help` | All commands |

### 2️⃣ Moderation Bot (needs mod role)
| Command | What it does |
|---------|-------------|
| `!clear <1-100>` | Delete messages |
| `!kick @user reason` | Kick a member |
| `!ban @user reason` | Ban a member |
| `!warn @user reason` | Warn a member |

### 3️⃣ Fun Bot
| Command | What it does |
|---------|-------------|
| `!8ball <question>` | Magic 8ball answers |
| `!roll <sides>` | Roll a dice |
| `!flip` | Flip a coin |
| `!choose <a> or <b>` | Pick between options |
| `!userinfo [@user]` | User info |
| `!serverinfo` | Server info |

### 4️⃣ Level Bot (saves XP in database)
| Command | What it does |
|---------|-------------|
| `!rank` | See your level and XP |
| `!leaderboard` | Top 10 members |
| *(chat)* | Earn XP automatically |

### 5️⃣ Giveaway Bot (needs mod role)
| Command | What it does |
|---------|-------------|
| `!giveaway 1h prize` | Start a giveaway |
| `!endgiveaway <msg-id>` | End early |
| `!reroll <msg-id>` | Pick new winner |

### 6️⃣ Welcome Bot
| Command | What it does |
|---------|-------------|
| `!setwelcome` | Set this channel for welcomes |
| `!goodbye` | Set this channel for goodbyes |
| *(member joins)* | Auto-welcome + DM + role |

---

## 🔧 Quick Reference

| Need | Do This |
|------|---------|
| Install dependencies | `npm install` in the template folder |
| Run the bot | `npm start` in the template folder |
| Stop the bot | Press `Ctrl + C` |
| Change bot prefix | Edit the commands in `index.js` |
| Add more commands | Copy the `if (message.content === '!cmd')` pattern |

## ❌ Common Problems & Fixes

| Error | Fix |
|-------|-----|
| `Cannot find module 'discord.js'` | Run `npm install` in the bot folder |
| `TOKEN is not defined` | Make sure `.env` file exists (rename from `.env.example`) |
| `Privileged intent` error | Developer Portal → Bot → Enable **Message Content Intent** |
| Bot is online but ignores messages | Enable **Message Content Intent** (same as above) |
| `Cannot find module` | You're in the wrong folder — `cd` into the bot folder first |
| Bot says "I cannot kick/ban" | Bot role needs to be ABOVE the user's role in server settings |

## 📁 File Structure
```
Discord-Bot-Templates/
├── 01-basic-bot/         # Start here if you're new
│   ├── index.js          # Bot code — edit this
│   ├── package.json      # Dependencies list
│   └── .env.example      # Rename to .env → paste token
├── 02-moderation-bot/    # Moderation commands
├── 03-fun-bot/           # Fun & games
├── 04-level-bot/         # XP & level system
├── 05-giveaway-bot/      # Giveaway system
├── 06-welcome-bot/       # Welcome/goodbye system
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⭐ Support

Star this repo if it helps you! More templates coming.

**Made with ❤️ by Adhithya J**

- 🐙 GitHub: https://github.com/mystry112000
- 📬 Contact: https://mystry112000.github.io/About-Me/contact.html
