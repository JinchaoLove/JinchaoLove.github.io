---
title: Configure Waline with TiDB
author: jcli
date: 2025-07-27 11:00:00 +0800
categories: [Blogging]
tags: [homepage]
render_with_liquid: false
---

## Why Waline + TiDB?

[Waline](https://waline.js.org/) is a lightweight, open-source, privacy-focused, and self-hosted comment system with backend UI and rich features, and [TiDB Cloud](https://tidbcloud.com/) offers a scalable, MySQL-compatible database with a generous 5GB free tier -- making them a powerful pair for efficient and reliable comment system.

## How to Set Up Waline with TiDB Cloud?

Follow these steps to deploy and configure [Waline](https://waline.js.org/) using [TiDB Cloud](https://tidbcloud.com/) as the database backend.

1. Create a cluster in [TiDB Database](https://tidbcloud.com/) (any name is okay)

2. Connect with the above cluster in your local editor (e.g., VS Code)

    To manage your database and initialize comment tables:

    1. Get Connection Details: In the TiDB Cloud console (Overview of the cluster), click the Connect button (top-right corner). You'll see the connection parameters `HOST`, `PORT`, `USERNAME`, `PASSWORD` (generate and copy it), `DATABASE` and `CA`.

    2. Set Up VS Code: See details in [TiDB Developer Guide](https://docs.pingcap.com/tidbcloud/dev-guide-gui-vscode-sqltools/).

    3. Initialize the Waline Database Schema: Copy [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) and execute the entire script in VS Code. The script will create a database named `waline` with `wl_Comment`, `wl_Counter` and `wl_Users` in it.

3. Configure `Environment Variables` as listed in [Waline Guidebook](https://waline.js.org/guide/database.html#tidb)

> When first connecting via VS Code, the default `Database` is `test`. After running `waline.tidb`, the actual database used by Waline is `waline`. So in `Environment Variables`, set `DATABASE = waline`.
{: .prompt-warn }
