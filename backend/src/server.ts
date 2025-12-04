import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get("/api/stores", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.sallinggroup.com/v2/stores?country=dk&geo=56.162939,10.203921&radius=20&per_page=200",
            {
                headers: {
                    Authorization: `Bearer ${process.env.SALLING_TOKEN}`,
                },
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


app.get("/api/getdiscount", async (req, res) => {


    try {
        const response = await fetch(
            `https://api.sallinggroup.com/v1/food-waste/ede9b435-fdb9-4e86-9035-db4c38f38c4c`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.SALLING_TOKEN}`,
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});


app.get("/api/discounts/:storeId", async (req, res) => {
    const storeId = req.params.storeId;

    try {
        const response = await fetch(
            `https://api.sallinggroup.com/v1/food-waste/${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.SALLING_TOKEN}`,
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});




app.listen(PORT, () => {
  console.log("Backend running at port " + PORT);
});
