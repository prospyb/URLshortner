import express from "express";
import ShortUrlModel from "../models/shortURL.js";

const router = new express.Router();

// Define routes
router.get("/", async (req, res) => {
    try {
        const shortUrls = await ShortUrlModel.find();
        res.render("index", { shortUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/shortUrls", async (req, res) => {
    console.log("req.body:", req.body);
    try {
        await ShortUrlModel.create({ full: req.body.full });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = await ShortUrlModel.findOne({ short: req.params.shortUrl });
        if (shortUrl == null) return res.sendStatus(404);

        shortUrl.clicks++;
        await shortUrl.save();

        res.redirect(shortUrl.full);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router };
