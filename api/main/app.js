import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import router from "../routes/routes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


app.get('/api/data', async (req, res, next) => {
  try {
    const content = { message: "Hello from a modern ESM Express server!" };
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

app.use('/query', router);

app.listen(PORT, () => {
  console.log(`Server is running seamlessly on port ${PORT}, http://localhost:${PORT}/query`);
});