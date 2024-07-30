// client/models/user.model.ts
import { Schema, model, Document, Types } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    refreshToken: string[];
    roles: string[];
    comparePassword: (password: string, callback: (err: Error | null, isMatch: boolean) => void) => void;
}

const userSchema = new Schema<IUser>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    refreshToken: { type: [String], default: [], required: true},
    roles: { type: [String], default: [], required: true }
});

// pre-save hook automatically hashes
userSchema.pre('save', function (next) {

  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.pre('save', function (next) {
  // limit array size to 4
  if (this.refreshToken.length > 4) {
    this.refreshToken = this.refreshToken.slice(-4);
  }
  next();
});

userSchema.methods.comparePassword = function (
    password: string,
    callback: (err: Error | null, isMatch: boolean) => void) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) return callback(err, false);
            callback(null, isMatch);
    });
};



export default model<IUser>('User', userSchema);