let count = 0;

module.exports = async (req, res) => {
  const ip = req.headers["x-real-ip"];
  count++;

  return res.status(200).json({ ip, count });
};
