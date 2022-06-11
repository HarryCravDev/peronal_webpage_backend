// const mongoose = require("mongoose");
import mongoose from "mongoose";
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: false,
    default: false
  },
});

UserSchema.pre(
  'save',
  async function(next: any) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;
    next();
  }
);

export const UserModel = mongoose.model('user', UserSchema);