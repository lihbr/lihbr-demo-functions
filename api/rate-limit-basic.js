const source =
  "https://github.com/lihbr/lihbr-demo-functions/blob/master/api/rate-limit-basic.js";

const history = {};

const rateLimit = (ip, timeout = 60 * 1000) => {
  if (history[ip] > Date.now() - timeout) {
    throw new Error("Rate Limit Exceeded");
  }
  history[ip] = Date.now();
};

module.exports = async (req, res) => {
  try {
    rateLimit(req.headers["x-real-ip"], 60 * 1000);
  } catch (error) {
    return res
      .status(429)
      .json({ status: 429, msg: "Too Many Requests", source });
  }

  return res.status(200).json({ status: 200, msg: "Hello World", source });
};
