 // client/models/wallet.model.ts
import { Schema, model, Document } from "mongoose";

export interface IWallet extends Document {
  address: string;
  twitter: string;
  label: string;
  nickname: string;
  notes: string;
  sponsor: string;
  time_created: Date;
  time_updated: Date;
}

const walletSchema = new Schema<IWallet>({
  address: {type: String, unique: true, required: true},
  twitter: {type: String, unique: true},
  label: {type: String, unique: false},
  nickname: {type: String, unique: true},
  notes: {type: String},
  sponsor: {type: String},
  time_created: {type: Date, default: Date.now},
  time_updated: {type: Date, default: Date.now},
});

export default model<IWallet>('Wallet', walletSchema);