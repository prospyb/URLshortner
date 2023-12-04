import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path"; // Import the dirname function explicitly
import path from "path"; // Import the path module explicitly
import { config } from "./src/config/connect.js";
import { router as urlRouter } from "./src/router/route.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// database connection
mongoose.connect(config.mongodb_connection_url).then(() => console.log("Database Connection Established")).catch((e) => console.log(e.message));

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views")); // Use path.join from the path module

// Use the router
app.use("/", urlRouter);
app.use(express.urlencoded({extended: false}))

const port = config.port || 8080;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
