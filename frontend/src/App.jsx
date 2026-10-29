import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    setAnswer("Thinking...");

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Error connecting to AI server.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>AI Study Assistant</h1>

      <p>
        Ask a question about programming, networking, Linux, or any school topic.
      </p>

      <textarea
        rows="6"
        style={{ width: "100%" }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: Explain what the Linux ls command does"
      />

      <br />
      <br />

      <button onClick={askAI}>
        Ask AI
      </button>

      <h2>Response</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
        }}
      >
        {answer}
      </div>
    </div>
  );
}

export default App;