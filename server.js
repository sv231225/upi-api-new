const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

// ============================
// ROOT
// ============================
app.get("/", (req, res) => {
    res.send("UPI API FINAL 🚀");
});

// ============================
// TEST
// ============================
app.get("/test", (req, res) => {
    res.send("TEST OK V2 ✅");
});

// ============================
// UPI CHECK
// ============================
app.post("/check_upi", async (req, res) => {

    const { upi } = req.body;

    if (!upi) {
        return res.status(400).json({ error: "UPI required" });
    }

    try {

        const response = await fetch(
            "https://aml-gui.chargebackzero.com/report_generation/upi_verify_proxy.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    recipientVpa: upi
                })
            }
        );

        const data = await response.json();

        res.json({
            status: data.status || "unknown"
        });

    } catch (e) {
        res.status(500).json({
            status: "error"
        });
    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started 🚀");
});
