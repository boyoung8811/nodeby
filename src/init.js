import "./db";
import "./models/video";
import app from "./app";

const PORT = 5000;

const handleListening = () =>
  console.log(`✔Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);