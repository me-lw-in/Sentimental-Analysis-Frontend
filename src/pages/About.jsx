function About() {
  return (
    <div className="min-h-screen bg-darkBg text-white flex justify-center items-center px-6 py-10">
      <div className="max-w-3xl bg-darkCard border border-darkBorder p-10 rounded-2xl shadow-3xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
          About This Project
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          This system performs <strong>Tulu-English Sentiment Analysis</strong> on 
          <strong> code-mixed comments</strong>. It determines whether a comment expresses a
          <span className="text-green-400"> Positive</span>,
          <span className="text-yellow-400"> Neutral</span>, or
          <span className="text-red-400"> Negative</span> sentiment.
        </p>

        <p className="text-gray-400 mb-6">
          The backend, built with <strong>FastAPI</strong>, was trained and tested with 
          different combinations of <strong>vectorizers</strong> and <strong>classification algorithms</strong>.  
          Each model was evaluated for accuracy, precision, recall, and F1-score.
        </p>

        <h2 className="text-2xl font-semibold text-blue-300 mb-3 text-center">🧩 Models Compared</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li><strong>CountVectorizer + Naive Bayes</strong> — Fast and simple baseline model.</li>
          <li><strong>CountVectorizer + Logistic Regression</strong> — Learns weighted word importance.</li>
          <li><strong>TF-IDF + Naive Bayes</strong> — Balances frequent and rare word contributions.</li>
          <li><strong>TF-IDF + Logistic Regression</strong> — Achieved the <span className="text-green-400 font-semibold">best overall performance</span>.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mb-3 text-center">⚙️ Features</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          <li>Interactive and minimal React + Tailwind UI</li>
          <li>Live model comparison with performance charts</li>
          <li>Confidence and accuracy visualization</li>
          <li>Explainable model insights and dataset overview</li>
          <li>Backend API powered by FastAPI and deployed on Render</li>
        </ul>

        <p className="text-center text-gray-400">
          🧠 Developed by <strong>Melwin Manish Mendonca</strong> <br />
          as part of an MCA Mini-Project on Tulu-English Sentiment Analysis.
        </p>
      </div>
    </div>
  );
}

export default About;
