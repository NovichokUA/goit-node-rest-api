// import mongoose from "mongoose";
// import app from "./app.js";

// const { DB_URI, PORT } = process.env;

// // const DB_URI =
// //   "mongodb+srv://zubr7333:QgbLVedtSzoS363u@cluster0.uxid2qo.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(DB_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

import { connectDb } from "./db/dbServer.js";
import app from "./app.js";

const { PORT } = process.env;

async function startServer() {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}

startServer();
