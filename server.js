require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cosmeticsRoutes = require("./src/routes/cosmeticsRoutes");
const brandsRoutes = require("./src/routes/brandsRoutes")
const reportRoutes = require("./src/routes/reportRoutes")

const path = require("path");

const app = express();
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/api", cosmeticsRoutes);
app.use("/api", brandsRoutes);
app.use("/api", reportRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`💅💄 Servidor rodando em http://localhost:${PORT}`);
});
