const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const folderRoutes = require("./routes/folderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/folders", folderRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));
