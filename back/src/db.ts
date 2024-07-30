// db.ts
import mongoose from 'mongoose';

import { dbConfig } from './config/db.js';

const db = mongoose.connection;

db.on('connected', () => console.log('db: connected'));
db.on('open', () => console.log('db: open'));
db.on('disconnected', () => console.log('db disconnected'));
db.on('reconnected', () => console.log('db: reconnected'));
db.on('disconnecting', () => console.log('db: disconnecting'));
db.on('close', () => console.log('db: close'));

async function connect() {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options)
    } catch (error) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}

export default connect;