const { default: axios } = require("axios");
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

const checkAuthentication = async (req, res, next) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/authservice/api/v1/isAuthenticated",
      {
        httpsAgent: agent,
        headers: {
          "x-access-token": req.headers["x-access-token"],
        },
      }
    );
    console.log(response.data.success);
    if (!response.data.success) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return res.status(401).json({
        message: "Unauthorized",
        error: error.response.data,
      });
    } else {
      console.error(error);
    }
  }
};

module.exports = {
  checkAuthentication,
};