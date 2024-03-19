import { app } from "./app";
import connectDb from "./utils/db";
require("dotenv").config();

// create server configuration
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  connectDb();
});
