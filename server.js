const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("WORKING ROOT ✅");
});

app.get("/test", (req, res) => {
    res.send("TEST OK ✅");
});

app.post("/check_upi", (req, res) => {
    const { upi } = req.body;

    res.json({
        status: "received",
        upi: upi
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on", PORT);
});