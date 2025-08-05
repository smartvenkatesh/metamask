import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Currency" },
  amount: Number,
  holdAmount: Number,
});

const UserWallet = mongoose.model("UserWallet", userWalletSchema);

export default UserWallet;
