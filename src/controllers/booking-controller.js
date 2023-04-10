const { StatusCodes } = require("http-status-codes");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");

const bookingService = new BookingService();

const sendMessageToQueue = async (data) => {
  console.log("controller", data);
  const channel = await createChannel();
  const payload = {
    data: {
      subject: `Hi`,
      content: "Anshul",
      recepientEmail: data.email,
      notificationTime: "2023-04-09T09:19:00.000",
    },
    service: "CREATE_TICKET",
  };
  publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
  // return res.status(200).json({
  //   message: "Successfully published the event",
  // });
};

const create = async (req, res) => {
  try {
    req.body.userId = req.body.data.id;
    const { flightId, noOfSeats, userId } = req.body;
    const response = await bookingService.createBooking({
      flightId,
      noOfSeats,
      userId,
    });
    sendMessageToQueue(req.body.data);
    console.log(response);

    return res.status(StatusCodes.OK).json({
      message: "Successfully Completed Booking",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explaination,
      data: {},
    });
  }
};

module.exports = {
  sendMessageToQueue,
  create,
};
