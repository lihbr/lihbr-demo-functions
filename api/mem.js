const source =
  "https://github.com/lihbr/lihbr-demo-functions/blob/master/api/mem.js";

let count = 0;

module.exports = async (req, res) => {
  count++;

  return res.status(200).json({ count, source });
};
