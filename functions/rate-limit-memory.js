const source =
  "https://github.com/lihbr/lihbr-demo-functions/blob/master/functions/rate-limit-memory.js";

const LIMIT = 5;

const rateLimit = require("lambda-rate-limiter")({ interval: 60 * 1000 }).check;

exports.handler = async (event, context) => {
  let used;
  try {
    used = await rateLimit(LIMIT, event.headers["client-ip"]);
  } catch (error) {
    return {
      statusCode: 429,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        status: 429,
        msg: "Too Many Requests",
        limit: LIMIT,
        remaining: 0,
        source
      })
    };
  }

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      status: 200,
      msg: "Hello World",
      limit: LIMIT,
      remaining: LIMIT - used,
      source
    })
  };
};
