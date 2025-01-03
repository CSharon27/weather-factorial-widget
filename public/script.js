document.getElementById("getWeather").addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    const result = document.getElementById("weatherResult");

    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            result.textContent = data.error;
        } else {
            result.textContent = `Temperature: ${data.temperature}°C, Condition: ${data.condition}`;
        }
    } catch (error) {
        result.textContent = "Error fetching weather data.";
    }
});

document.getElementById("calculateFactorial").addEventListener("click", async () => {
    const num = parseInt(document.getElementById("number").value);
    const method = document.getElementById("method").value;
    const result = document.getElementById("factorialResult");

    try {
        const response = await fetch(`/api/factorial`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ num, method }),
        });
        const data = await response.json();

        if (data.error) {
            result.textContent = data.error;
        } else {
            result.textContent = `Factorial (${method}): ${data.result}`;
        }
    } catch (error) {
        result.textContent = "Error calculating factorial.";
    }
});
