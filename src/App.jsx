import './App.css'
import { useState } from "react";
import TranslateForm from './components/TranslateForm';
import TranslateResult from './components/TranslateResult';

export default function App() {
  const [showPage, setShowPage] = useState(true);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslateText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

const handleTranslate = async (text, language) => {
  console.log(import.meta.env.VITE_POLYGLOT_WORKER_URL);
  if (!text.trim()) {
    setError("Please enter some text to translate");
    return;
  }
  setError("");
  setIsLoading(true);

  try {
    const response = await fetch(
      import.meta.env.VITE_POLYGLOT_WORKER_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language }),
      }
    );
    const data = await response.json();
      if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
    setOriginalText(text);
    setTranslateText(data.translation); 
    setShowPage(false);

  } catch (error) {
    console.log(error);
    setError("Network error");
  } finally {
    setIsLoading(false);
  }
};
  const handleStartOver = () => {
    setShowPage(true);
    setOriginalText("");
    setTranslateText("");
  }
  return (
    <>
      {showPage ?
        <TranslateForm
          onTranslate={handleTranslate}
          error={error}
          clearError={() => setError("")}
          isLoading={isLoading}
        />
        : <TranslateResult
          originalText={originalText}
          translatedText={translatedText}
          onStartOver={handleStartOver}
        />
      }
    </>
  );
}