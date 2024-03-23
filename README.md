# Fortnite Stats Bot

Get your **Battle Royale** stats!

## How to contribute

To use this API in your machine, you need to follow some steps:

1. Clone repository
2. Install packages
3. Add your variables in `.env`
4. Run

### Clone repository

So, first thing first, create your app direactory or anywhere:

```bash
$ mkdir -p /apps/fortnite
```

> The `-p` makes directory even the parent is not exists.

Then go inside it:

```bash
$ cd /apps/fortnite
```

To clone repo, just run the following command:

```bash
$ git clone https://github.com/BlackIQ/fortnite-stats-bot
```

If you want to clone it in your own name, add your name as argument:

```bash
$ git clone https://github.com/BlackIQ/fortnite-stats-bot bot
```

### Install packages

Ok, now go inside project:

```bash
$ cd  /apps/fortnite/bot
```

Then install dependencies:

```bash
$ npm i
```

### Add your variables in `.env`

To start app, you need to add app data, backend url, telegram bot token and proxy.

Now copy `.env.example` to `.env`:

```bash
$ cp .env.example .env
```

Then let's put our values.

#### Proxy

If you are living in Iran or anywhere that want to pass your bot traffic bia a proxy, you need to add the proxy socks5 connection string to `PROXY_SOCKS5` like this:

```bash
PROXY_SOCKS5=socks5://localhost:1091
```

#### App

App just have a variable. This variable is just to check app is production or development. If this variable be **production** it won't use proxy. But if you want to use proxy, add **development**.

```bash
APP_ENVIRONMENT
```

#### Telegram

Your bot have a token gave by Telegram. Just this.

```bash
BOT_TOKEN
```

#### Backend

Last thing, just add the backend url. I mean [this project](https://github.com/BlackIQ/fortnite-stats-api).

```bash
API_URL
```

### Run

Now your configuration is ready! Let's run it!

```bash
$ npm test
```