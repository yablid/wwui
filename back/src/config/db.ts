// config/database.ts
import mongoose from 'mongoose';

import './private.js';

const username = encodeURIComponent(process.env.DB_USER as string);
const password = encodeURIComponent(process.env.DB_PASS as string);
const cluster = process.env.DB_CLUSTER;
const name = process.env.DB_NAME;

let DB_URI: string;

if (process.env.NODE_ENV === 'docker') {
  DB_URI = 'mongodb://host.docker.internal:27017';
} else {
  DB_URI =
  cluster
    ? `mongodb+srv://${username}:${password}@${cluster}`
    : 'mongodb://127.0.0.1:27017/wwuitest';
}

export const dbConfig = {
  uri: DB_URI,
  options: {
    dbName: name,
  } as mongoose.ConnectOptions,
};
