import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Currency" },
  type: String,
  amount: Number,
  txHash: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
