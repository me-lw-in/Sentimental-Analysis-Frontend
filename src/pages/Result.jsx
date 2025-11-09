import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function Result() {
  const [result, setResult] = useState(null);
  const [inputText, setInputText] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const last = JSON.parse(localStorage.getItem("lastResult"));
    const text = localStorage.getItem("lastText");
    if (!last) navigate("/");
    else {
      setResult(last);
      setInputText(text);

      // maintain history (max 5)
      const prev = JSON.parse(localStorage.getItem("history")) || [];
      if (!prev.length || prev[0].text !== text) {
        const newHistory = [
          {
            text,
            sentiment: last.predicted_sentiment,
            confidence: last["confidence (%)"],
          },
          ...prev,
        ];
        localStorage.setItem("history", JSON.stringify(newHistory.slice(0, 5)));
        setHistory(newHistory.slice(0, 5));
      } else {
        setHistory(prev.slice(0, 5));
      }
    }
  }, []);

  if (!result) return null;

  const sentiment = result.predicted_sentiment.toLowerCase();
  const confidence = result["confidence (%)"];

  const colorMap = {
    positive: "#4ade80",
    negative: "#f87171",
    neutral: "#facc15",
  };

  const emojiMap = {
    positive: "😊",
    negative: "😔",
    neutral: "😐",
  };

  const data = [
    { name: "Confidence", value: confidence },
    { name: "Uncertainty", value: 100 - confidence },
  ];

  return (
    <div className="min-h-screen bg-darkBg text-white py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-darkCard p-8 rounded-xl border border-darkBorder shadow-3xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
          Sentiment Analysis Result
        </h1>

        <p className="text-center text-lg text-gray-300 mb-6 italic">
          “{inputText}”
        </p>

        {/* Sentiment Display */}
        <div className="text-center mb-10">
          <span className="text-7xl">{emojiMap[sentiment]}</span>
          <h2
            className={`text-4xl font-extrabold mt-4`}
            style={{ color: colorMap[sentiment] }}
          >
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </h2>
          <p className="text-gray-400 mt-2">
            Confidence: <span className="font-semibold">{confidence}%</span>
          </p>
        </div>

        {/* Confidence Chart */}
        <div className="bg-darkBg rounded-lg p-5 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-blue-300 text-center">
            Confidence Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}  margin={{ top: 30, right: 30, left: 20, bottom: 10 }}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="value"
                fill={colorMap[sentiment]}
                barSize={70}
                radius={[10, 10, 0, 0]}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  fill="#ffffff"
                  fontSize={14}
                  formatter={(v) => `${v.toFixed(1)}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* History */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-blue-300">
            Recent Analyses
          </h3>
          {history.map((item, idx) => (
            <div
              key={idx}
              className="border-b border-darkBorder py-2 flex justify-between text-gray-300"
            >
              <span className="truncate max-w-[60%]">{item.text}</span>
              <span style={{ color: colorMap[item.sentiment.toLowerCase()] }}>
                {item.sentiment} ({item.confidence}%)
              </span>
            </div>
          ))}
        </div>

        {/* Summary Insight */}
        <div className="bg-darkBg rounded-lg p-4 border border-darkBorder text-center mb-6">
          <p className="text-gray-300">
            The system identified this sentence as{" "}
            <span style={{ color: colorMap[sentiment] }}>
              {sentiment.toUpperCase()}
            </span>{" "}
            with <b>{confidence}%</b> confidence using TF-IDF + Logistic
            Regression.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 font-bold hover:shadow-xl transition-transform hover:-translate-y-1"
        >
          🔙 Go Back
        </button>
      </div>
    </div>
  );
}

export default Result;
