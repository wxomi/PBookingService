const express = require("express");

const {
  create,
  sendMessageToQueue,
} = require("../../controllers/booking-controller");
const {
  checkAuthentication,
} = require("../../middlewares/checkAuthentication");
// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();

const router = express.Router();

router.post("/bookings", [checkAuthentication], create);
router.post("/publish", sendMessageToQueue);

module.exports = router;
