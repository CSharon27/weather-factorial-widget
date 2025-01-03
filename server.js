const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const WEATHER_API_KEY = "f91ae71462cfad9ca077cf8421c9d666";
//"bd5e378503939ddaee76f12ad7a97608";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/weather", async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City name is required" });

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const { temp } = response.data.main;
        const condition = response.data.weather[0].description;
        res.json({ temperature: temp, condition });
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.post("/api/factorial", (req, res) => {
    const { num, method } = req.body;
    if (num < 0 || isNaN(num)) return res.status(400).json({ error: "Invalid number" });

    const factorialIterative = (n) => {
        let result = 1;
        for (let i = 1; i <= n; i++) result *= i;
        return result;
    };

    const factorialRecursive = (n) => (n <= 1 ? 1 : n * factorialRecursive(n - 1));

    const result = method === "recursive" 
        ? factorialRecursive(num) 
        : factorialIterative(num);

    res.json({ num, method, result });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
