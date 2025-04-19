import express from 'express';
import 'dotenv/config';
import router from './routers/index.js';
import connectDB from './config/dbClient.js';

const app = express()

app.use(express.json());
app.use("/", router)

await connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(' Server is running on port ' + PORT);
});