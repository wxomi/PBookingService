const express = require("express");

const { BookingController } = require("../../controllers/index");
const {
  checkAuthentication,
} = require("../../middlewares/checkAuthentication");
// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();
const bookingController = new BookingController();

const router = express.Router();

router.post("/bookings", [checkAuthentication], bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;
