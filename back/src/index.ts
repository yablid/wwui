// src/index.ts
import './config/private.js';

// mitigate cross site request forgery attacks

import express, { Request, Response, NextFunction } from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import { register } from '@/controllers/register.js';
import { login } from '@/controllers/login.js';
import { logout } from '@/controllers/logout.js';
import { protect } from '@/middleware/protect.js';
import { verify } from '@/controllers/verify.js';
import { refresh } from '@/controllers/refresh.js';
import { changePassword } from '@/controllers/changePassword.js';
import { addWallet } from '@/controllers/addWallet.js';

import connect from '@/db.js';

const app = express();
const port = process.env.PORT || 4001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to db
await connect();

// middleware
app.use(helmet());

app.use(cors({
  origin: [
      'http://localhost:5173',
      'https://localhost:5173'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Any request to Express App for a static file are routed to the 'client/dist' folder
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// Parse incoming request body and make available on req.body property of request object
app.use(express.json());

// Parses urlencoded payloads, making key-value pairs available on req.body property of request object
app.use(express.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// cookie logger
app.use((req: Request, res: Response, next: NextFunction) => {
    // log cookies
    next(); // Continue to the next middleware or route handler
});

// Routes
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/verify', verify);
app.get('/api/refresh', refresh);

// protected routes
app.post('/api/logout', protect, logout);
app.post('/api/changePassword', protect, changePassword);
app.post('/api/addWallet', protect, addWallet);

// last route defined serves up not found if nothing else is found beforehand
app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
});