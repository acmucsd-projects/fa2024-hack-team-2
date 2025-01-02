# Swipe Style

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup](#setup)
5. [Summary](#summary)
6. [Developer Notes](#developer-notes)

## Project Overview

## Features

## Technologies Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Setup

For mac use **npm** and for windows use **npx**.

1. **Client Side**:
   Install dependencies,

   ```bash
   npm install
   ```

   If you get any depricated warnings, fixed them by running,

   ```bash
   npm audit fix
   ```

   To start the client, run,

   ```bash
   npm run dev
   ```

2. **Server Side**:
   Install dependencies,

   ```bash
   npm install
   ```

   If you get any depricated warnings, fixed them by running,

   ```bash
   npm audit fix
   ```

   To start the server, run,

   ```bash
   npm start
   ```

## Summary

## Developer Notes

### 💻 MERN stack template in Typescript

Template for building projects with the MERN (MongoDB, Express, React, Node.js) stack.
This template was generated using `create-next-app` and `express-generator` for the
client and server, respectively.

#### Prerequisites

- Install Node and npm [here](https://nodejs.org/en/download/)
- Set up a [MongoDB Atlas](https://www.mongodb.com/) instance. See [this video](https://www.youtube.com/watch?v=CcOL5h_ZFJM) for help!
- Create a `.env` file with a variable called `DB_URL` and paste your MongoDB url:

```bash
DB_URL=mongodb://mongodburl.example.com:portnumber
```

#### Running

1. `cd` into `client` and run the command `npm install` to install all dependencies
2. To start the client, run `npm run dev` in the same directory
3. In another command window, `cd` into `server` and run `npm install` and `npm start`
   to install all dependencies and start the server.
4. To kill a port, use 'npx kill-port <PORT_NUMBER>'
5. For Linux/Mac use 'sudo lsof' to see what ports are active.
6. For Windows, use 'netstat -a -b'
7. If you want to change the port for server, head to the server/bins/www.
   Look for the line `var port = normalizePort(process.env.PORT || '3001');`
   Change it to any port you like!
8. Happy hacking!
