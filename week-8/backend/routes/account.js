const { Router } = require("express");
const router = Router();
const zod = require("zod");
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../config/db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const userAccount = await Account.findOne({ userId });

  res.status(200).json({
    balance: userAccount.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { to, amount } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Insufficient Balance or Invalid Account",
      });
    }

    const toTransferAccount = await Account.findOne({ userId: to });

    if (!toTransferAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: +amount,
        },
      }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
