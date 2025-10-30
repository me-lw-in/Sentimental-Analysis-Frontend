import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [inputText, setInputText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  // Function to call backend API
  const handleAnalyze = async () => {
    if (inputText.trim() === "") return;

    setLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch("https://tulu-english-sentiment-analysis.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: inputText }),
      });
      toast.success("✨ Sentiment successfully analyzed!")
      const data = await response.json();
      setAnalysisResult(data.predicted_sentiment);
      setPercentage(data["confidence (%)"]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Server is unreachable — please try again in a moment.")
    } finally {
      setLoading(false);
    }
  };

  // Choose color theme based on sentiment
  const getResultClasses = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return {
          textColor: "text-green-400",
          borderColor: "border-green-400",
          bgColor: "bg-green-500/20",
        };
      case "negative":
        return {
          textColor: "text-red-400",
          borderColor: "border-red-400",
          bgColor: "bg-red-500/20",
        };
      case "neutral":
        return {
          textColor: "text-yellow-400",
          borderColor: "border-yellow-400",
          bgColor: "bg-yellow-500/20",
        };
      default:
        return {
          textColor: "text-gray-400",
          borderColor: "border-gray-600",
          bgColor: "bg-gray-700/20",
        };
    }
  };

  const styleClasses = analysisResult ? getResultClasses(analysisResult) : {};

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-darkBg text-white font-sans">
        <div className="w-full max-w-2xl bg-darkCard p-8 rounded-xl shadow-3xl border border-darkBorder">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 pb-5 border-b border-darkBorder text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
            Tulu-English Sentiment Analysis
          </h1>

          {/* Input Text */}
          <div className="mb-8">
            <label
              htmlFor="sentiment-text"
              className="block text-lg font-semibold mb-3 text-gray-300"
            >
              Enter Tulu-English Mixed Text:
            </label>
            <textarea
              id="sentiment-text"
              className="w-full p-4 h-36 bg-darkBg text-white rounded-lg border-2 border-darkBorder focus:outline-hidden resize-none text-base transition-all duration-300"
              placeholder="E.g., 'Ayena acting matra next level' (His acting was on next level)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>

          {/* Analyse Button */}
          <div className="mb-10">
            <button
              onClick={handleAnalyze}
              disabled={loading || inputText.trim() === ""}
              className={`w-full py-4 text-xl font-bold rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out ${
                loading || inputText.trim() === ""
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Analyzing..." : "🚀 Analyse Sentiment"}
            </button>
          </div>

          {/* Sentiment Result */}
          {analysisResult && (
            <div
              className={`mt-8 p-6 rounded-xl border-4 ${styleClasses.borderColor} ${styleClasses.bgColor} text-center transition-all duration-500 ease-in-out transform scale-100 hover:scale-[1.01]`}
            >
              <h3
                className={`text-2xl font-light mb-2 ${styleClasses.textColor}`}
              >
                Sentiment Detected:
              </h3>
              <p
                className={`text-6xl md:text-7xl font-extrabold leading-tight ${styleClasses.textColor}`}
              >
                {analysisResult.charAt(0).toUpperCase() +
                  analysisResult.slice(1).toLowerCase()}
              </p>
              <p
                className={`mt-4 text-lg ${styleClasses.textColor} opacity-80`}
              >
                We’re {percentage}% sure this comment feels {analysisResult.charAt(0).toUpperCase() + analysisResult.slice(1).toLowerCase()}.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
