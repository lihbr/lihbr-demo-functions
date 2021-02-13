const source =
  "https://github.com/lihbr/lihbr-demo-functions/blob/master/functions/rate-limit-basic.js";

const history = {};

const rateLimit = (ip, timeout = 60 * 1000) => {
  if (history[ip] > Date.now() - timeout) {
    throw new Error("Rate Limit Exceeded");
  }
  history[ip] = Date.now();
};

exports.handler = async (event, context) => {
  try {
    rateLimit(event.headers["client-ip"], 60 * 1000);
  } catch (error) {
    return {
      statusCode: 429,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "429", msg: "Too Many Requests", source })
    };
  }

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "200", msg: "Hello World", source })
  };
};
