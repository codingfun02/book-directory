import express from "express";

const PORT = process.env.PORT;
const app = express();

const handleServerListening = () => {
  console.log(`✅ Server Listening at port ${PORT}`);
};

app.listen(PORT, handleServerListening);

export default app;
