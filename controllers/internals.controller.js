export const checkHealth = (req, res) => {
  return res.status(200).json({
    isSuccess: true,
    code: "CONNECTION_SUCCESS",
    message: "Connection established!",
  });
};
