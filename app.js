const express = require('express');

require('dotenv').config();
const dbURL = process.env.DATABASE_URL;

const app = express();