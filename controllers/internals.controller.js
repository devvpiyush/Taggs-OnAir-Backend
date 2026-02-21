export const checkHealth = (req, res, next) => {
  console.log(req);
  res.status(200).json({
    isSuccess: true,
    message: "Connection established!",
  });
};
