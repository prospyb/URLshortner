import express from "express";
import ShortUrl from "../models/shortURL.js"

const router = new express.Router();

// Define routes
router.get("/", async (req, res) => {
    try {
        // Fetch shortUrls from the database (adjust this query based on your actual data fetching logic)
        const shortUrls = await ShortUrl.find();

        // Render the "index" template and pass the shortUrls variable
        res.render("index", { shortUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/shortUrls", async (req, res) => {
    try {
        // Create a new short URL and redirect to the root path
        await ShortUrl.create({ full: req.body.full.Url });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


export { router };
