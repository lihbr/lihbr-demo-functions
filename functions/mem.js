const source =
  "https://github.com/lihbr/lihbr-demo-functions/blob/master/functions/mem.js";

let count = 0;

exports.handler = async (event, context) => {
  const ip = event.headers["client-ip"];
  count++;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ip, count, source })
  };
};
