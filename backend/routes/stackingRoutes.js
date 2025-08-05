import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import Web3 from "web3";
import mongoose from "mongoose";
import cron from "node-cron";
import Currency from "../models/Currency.js";
import UserWallet from "../models/UserWallet.js";
import UserAddress from "../models/UserAddress.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body.formData;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAppUser = {
      username,
      email,
      password,
    };

    const saved = await User.create(newAppUser);

    res
      .status(200)
      .json({ message: "user successfully register", userId: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.form;
  try {
    const user = await User.findOne({ email: email });

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "5hr",
    });
    console.log("jwtToken", jwtToken);

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      user_id: user._id,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/addCurrency", async (req, res) => {
  const { currencyName, currencySymbol, usdValue } = req.body;
  try {
    const currency = await Currency.findOne({ currencySymbol });
    if (currency) {
      return res.status(400).json({ message: "This currency already added" });
    }

    const addCurrency = new Currency({
      currencyName,
      currencySymbol,
      usdValue,
    });

    await addCurrency.save();
    res.status(200).json({ message: "New Currency Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/userWallet", async (req, res) => {
  const { userId, currencyId, amount } = req.body;
  try {
    const wallet = {
      userId,
      currencyId,
      amount,
    };
    await UserWallet.create(wallet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getCurrency", async (req, res) => {
  try {
    const getCurrency = await Currency.find({});
    res.json(getCurrency);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addAddress", async (req, res) => {
  const { userId, address, currencyId, privateKey } = req.body;
  try {
    const currency = await Currency.findOne(
      { currencyName: currencyId },
      { _id: 1, currencySymbol: 1 }
    );
    const exists = await UserAddress.findOne({ currencyId: currency._id });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Already address created this currency" });
    }

    const addAddress = {
      userId,
      address,
      currencyId: currency._id,
      currencyType: currency.currencySymbol,
      privateKey,
    };
    console.log("addAddress", addAddress);

    await UserAddress.create(addAddress);
    res.status(200).json({ message: "Address created Succefully" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
