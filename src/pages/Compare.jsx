import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";

const Compare = () => {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!comment.trim()) return alert("Please enter a comment!");
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/compare_models", {
        comment: comment,
      });
      setResult(res.data);
      toast.success("🧠 Model comparison data loaded successfully!");
    } catch (err) {
      toast.error("Error fetching comparison!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ToastContainer/>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
          🧠 Compare Model Performance
        </h1>

        {/* Input Section */}
        <div className="flex gap-3 mb-8 justify-center">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter a comment to analyze..."
            className="border px-3 py-2 w-2/3 rounded-md focus:outline-none shadow-sm"
          />
          <button
            onClick={handleCompare}
            className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center text-green-700">
              ✅ Best Model:{" "}
              <span className="font-bold text-green-800">
                {result.best_model}
              </span>
            </h2>

            {/* Model Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {result.models.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all"
                >
                  <h3 className="font-bold text-lg text-blue-700 mb-3">
                    {m.vectorizer} + {m.algorithm}
                  </h3>
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <b>Prediction:</b> {m.prediction}
                    </p>
                    <p>
                      <b>Confidence:</b> {m["confidence (%)"]}%
                    </p>
                    <p>
                      <b>Accuracy:</b> {m["accuracy (%)"]}%
                    </p>
                    <p>
                      <b>Precision:</b> {m["precision (%)"]}%
                    </p>
                    <p>
                      <b>Recall:</b> {m["recall (%)"]}%
                    </p>
                    <p>
                      <b>F1-score:</b> {m["f1-score (%)"]}%
                    </p>
                    <p>
                      <b>Response Time:</b> {m["response_time (s)"]} s
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-center text-indigo-800">
                📊 Model Performance Comparison
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={result.models}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis
                    dataKey={(d) => `${d.vectorizer.replace("Vectorizer", "Vec")} + ${d.algorithm}`}
                    tick={{ fill: "#374151" }}
                    interval={0}
                    
                  />
                  <YAxis tick={{ fill: "#374151" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy (%)" fill="#2563EB">
                    <LabelList
                      dataKey="accuracy (%)"
                      position="top"
                      fill="#111827"
                    />
                  </Bar>
                  <Bar dataKey="precision (%)" fill="#10B981">
                    <LabelList
                      dataKey="precision (%)"
                      position="top"
                      fill="#111827"
                    />
                  </Bar>
                  <Bar dataKey="recall (%)" fill="#F59E0B">
                    <LabelList
                      dataKey="recall (%)"
                      position="top"
                      fill="#111827"
                    />
                  </Bar>
                  <Bar dataKey="f1-score (%)" fill="#DC2626">
                    <LabelList
                      dataKey="f1-score (%)"
                      position="top"
                      fill="#111827"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Compare;
