import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
