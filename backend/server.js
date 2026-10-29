import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `You are a study assistant. Explain concepts clearly and provide a short quiz.\n\n${question}`,
        stream: false
      })
    });

    const data = await response.json();

    res.json({
      answer: data.response
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get response."
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});