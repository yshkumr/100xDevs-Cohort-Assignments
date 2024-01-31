const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:wow786wow@cluster0.ribqhkj.mongodb.net/paytm"
);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
  },
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};
