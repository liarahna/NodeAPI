const express = require("express");
const fetch = require("node-fetch");
const app = express ();
app.use(express.json());
const PORT = 3000;

const NET_API_URL = "http://localhost:5275"


app.get("/products", async (req, res) => {
  try {
      const response = await globalThis.fetch(NET_API_URL + "/products");
      res.json(await response.json());
  } catch (error) {
      res.status(500).json({ error: "Unable to fetch data" });
  }
});

app.post("/product", async (req, res) => {
  try {
      const { name, type } = req.body;
      if (!name || !type) return res.status(400).json({ error: "Missing data in required fields" });

      console.log("Sending to .NET API:", req.body);

      const response = await fetch(NET_API_URL + "/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body)
      });

      res.json({ message: "Data sent", response: await response.json() });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Unable to send data" });
  }
});

  app.listen(PORT, () => {
    console.log("listening to 3000");
}); 