export const checkHealth = (req, res) => {
  res.status(200).json({
    isSuccess: true,
    signal: "GREEN",
    code: "CONNECTION_SUCCESS",
    message: "Connection established!",
  });
};
