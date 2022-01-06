import "./env.js";
import "./db.js";
import app from "./server";

const PORT = process.env.PORT;

const handleServerListening = () => {
  console.log(`✅ Server Listening at port ${PORT}`);
};

app.listen(PORT, handleServerListening);
