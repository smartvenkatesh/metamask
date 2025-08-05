import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Currency" },
  address: String,
  latestBlockNumber: Number,
  CurrencyType: String,
  privateKey: String,
});

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

export default UserAddress;
