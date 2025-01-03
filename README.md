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
![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Setup

**Requirements**
- Install Node and npm [here](https://nodejs.org/en/download/)
- Set up a [MongoDB Atlas](https://www.mongodb.com/) instance. See [this video](https://www.youtube.com/watch?v=CcOL5h_ZFJM) for help!

**Run the following commands:**

1. **Client Side**:
   Install dependencies,

   ```bash
   npm install
   ```

   If you get any deprecated warnings, fix them by running:

   ```bash
   npm audit fix
   ```

   To start the client, run:

   ```bash
   npm run dev
   ```

2. **Setting up MongoDB**: Create a `.env` file with the following environmental variables:

   ```bash
   GOOGLE_CLIENT_ID="your google client id"
   GOOGLE_CLIENT_SECRET="your google client secret"
   GOOGLE_CALLBACK_URL="your google callback url"
   SESSION_SECRET="your session secret"
   MONGO_URI="mongodb://mongodburl.example.com:portnumber"
   ```


3. **Server Side**:
   Install dependencies:

   ```bash
   npm install
   ```

   If you get any depricated warnings, fixed them by running,

   ```bash
   npm audit fix
   ```

   To start the server, run:

   ```bash
   npx tsc 
   npm start
   ```

## Summary

## Developer Notes