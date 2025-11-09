import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (inputText.trim() === "") return;
    setLoading(true);

    try {
      const response = await fetch("https://tulu-english-sentiment-analysis.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: inputText }),
      });
      const data = await response.json();

      // Save result temporarily
      localStorage.setItem("lastResult", JSON.stringify(data));
      localStorage.setItem("lastText", inputText);

      toast.success("✨ Sentiment analyzed!");
      setTimeout(() => {
        navigate("/result");
      }, 1000);
    } catch (error) {
      toast.error("⚠️ Server is unreachable!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-darkBg text-white font-sans">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-darkCard p-8 rounded-xl shadow-3xl border border-darkBorder">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
          Tulu-English Sentiment Analysis
        </h1>

        <textarea
          className="w-full p-4 h-36 bg-darkBg text-white rounded-lg border-2 border-darkBorder focus:outline-hidden resize-none text-base"
          placeholder="Type a Tulu-English sentence..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <button
          onClick={handleAnalyze}
          disabled={loading || inputText.trim() === ""}
          className={`mt-6 w-full py-3 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-lg ${
            loading || inputText.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Analyzing..." : "🚀 Analyze Sentiment"}
        </button>
      </div>
    </div>
  );
}

export default Home;
