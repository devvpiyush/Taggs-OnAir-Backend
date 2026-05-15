const handler = (fn) => {
  return (...args) => {
    const callback = args[args.length - 1];

    Promise.resolve(fn(...args)).catch((err) => {
      console.log("❌ Socket Error:", err.message);

      if (typeof callback === "function") {
        callback({
          status: "error",
          message: err.message,
        });
      }
    });
  };
};

export default handler;
