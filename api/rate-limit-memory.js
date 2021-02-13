const source =
  "https://github.com/lihbr/lihbr-demo-functions/blob/master/api/rate-limit-memory.js";

const LIMIT = 5;

const rateLimit = require("lambda-rate-limiter")({ interval: 60 * 1000 }).check;

module.exports = async (req, res) => {
  let used;
  try {
    used = await rateLimit(LIMIT, req.headers["x-real-ip"]);
  } catch (error) {
    return res.status(429).json({
      status: 429,
      msg: "Too Many Requests",
      limit: LIMIT,
      remaining: 0,
      source
    });
  }

  return res.status(200).json({
    status: 200,
    msg: "Hello World",
    limit: LIMIT,
    remaining: LIMIT - used,
    source
  });
};
