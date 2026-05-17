# 🤖 Discord Bot Templates

> Ready-to-run Discord bot code for beginners. Pick a template, add your token, and your bot is live in minutes.

---

## 📋 What's Inside

| # | Template | What It Does | Best For |
|---|----------|-------------|----------|
| 1 | [Basic Bot](01-basic-bot) | Ping, say, avatar, info, help commands | Getting started with Discord bots |
| 2 | [Moderation Bot](02-moderation-bot) | Kick, ban, warn, clear messages | Managing your server |
| 3 | [Fun Bot](03-fun-bot) | 8ball, dice roll, coinflip, choose, user/server info | Adding games & commands to your server |

---

## 🚀 How to Run (For Beginners)

### Step 1: Install Node.js
- Download from https://nodejs.org (click the big green button)
- Install it like any other program (next → next → finish)
- ✅ To check it worked: open terminal/cmd and type `node --version`

### Step 2: Create a Discord Bot
1. Go to https://discord.com/developers/applications
2. Click **"New Application"** → give it a name → **Create**
3. Click **"Bot"** in the left menu → **"Add Bot"** → **Yes**
4. Click **"Reset Token"** → **Copy** the token (looks like a long password)
5. NEVER share this token with anyone!

### Step 3: Invite the Bot to Your Server
1. In the Developer Portal, click **"OAuth2"** → **"URL Generator"**
2. Check **"bot"** under Scopes
3. Check these permissions:
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Kick Members (for mod bot)
   - ✅ Ban Members (for mod bot)
   - ✅ Manage Messages (for clear command)
4. Copy the generated URL → open it in browser → select your server → Authorize

### Step 4: Run the Bot
```bash
# Pick a template folder
cd 01-basic-bot

# Install dependencies (do this once)
npm install

# Create your .env file
# Rename .env.example to .env and paste your token inside

# Start the bot
npm start
```

You should see: `✅ Logged in as YourBotName#1234`

---

## 📁 Template Details

### 1️⃣ Basic Bot (`01-basic-bot`)

**Commands:**
| Command | What it does |
|---------|-------------|
| `!ping` | Bot replies with latency |
| `!say <text>` | Bot repeats your message (and deletes your command) |
| `!avatar` | Shows your profile picture |
| `!info` | Shows server info (members, created date, owner) |
| `!help` | Lists all commands |

### 2️⃣ Moderation Bot (`02-moderation-bot`)

**Setup:** Set `MOD_ROLE_ID` in `.env` to the role ID that can use mod commands.
To get a role ID: Server Settings → Roles → right-click a role → **Copy ID**

**Commands:**
| Command | What it does |
|---------|-------------|
| `!clear <1-100>` | Deletes that many messages |
| `!kick @user reason` | Kicks a member from the server |
| `!ban @user reason` | Bans a member from the server |
| `!warn @user reason` | Sends a warning in chat |

### 3️⃣ Fun Bot (`03-fun-bot`)

**Commands:**
| Command | What it does |
|---------|-------------|
| `!8ball <question>` | Ask the magic 8ball a question |
| `!roll <sides>` | Roll a dice (default 6 sides) |
| `!flip` | Flip a coin |
| `!choose <a> or <b>` | Bot picks between options |
| `!userinfo [@user]` | Shows user account info |
| `!serverinfo` | Shows server info |

---

## 💡 Tips for Beginners

- Start with **01-basic-bot** — it's the simplest
- If the bot doesn't respond, check the terminal for error messages
- Make sure the bot has the right permissions in your server
- Keep your **token secret** — if someone gets it, they can control your bot
- If you mess up the code, delete the folder and re-clone from GitHub
- To stop the bot: press `Ctrl + C` in the terminal

---

## ❌ Common Problems

| Problem | Fix |
|---------|-----|
| `Cannot find module 'discord.js'` | Run `npm install` in the bot folder |
| `TOKEN is not defined` | Make sure `.env` exists (not `.env.example`) |
| `Privileged intent` error | Go to Developer Portal → Bot → enable **Message Content Intent** |
| Bot doesn't see messages | Enable **Message Content Intent** in Developer Portal |
| `Cannot find module` errors | You're in the wrong folder — `cd` into the bot folder first |

---

## ⭐ Support

Star this repo if it helps you! More templates coming.

**Made with ❤️ by Adhithya J**

- 🐙 GitHub: https://github.com/mystry112000
- 📬 Contact: https://mystry112000.github.io/About-Me/contact.html
