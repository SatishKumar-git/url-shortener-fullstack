import { useState } from "react";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const shortenURL = async () => {
    if (!longUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCopied(false);

      const response = await fetch(
        "https://url-shortener-fullstack-8wdu.onrender.com/api/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setShortUrl(
        `https://url-shortener-fullstack-8wdu.onrender.com/${data.shortCode}`
      );
    } catch (error) {
      setError(error.message || "Server error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const copyURL = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const clearURL = () => {
    setLongUrl("");
    setShortUrl("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="main">
      <div className="card">
        <h1>🔗 URL Shortener</h1>

        <p>Convert long URLs into short links instantly</p>

        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <button className="shortenBtn" onClick={shortenURL}>
          {loading ? "Creating..." : "Shorten URL"}
        </button>

        <button className="clearBtn" onClick={clearURL}>
          Clear
        </button>

        {error && <div className="error">{error}</div>}

        {shortUrl && (
          <div className="result">
            <h3>Your Short URL</h3>

            <div className="urlBox">
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>

              <button className="copyBtn" onClick={copyURL}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;