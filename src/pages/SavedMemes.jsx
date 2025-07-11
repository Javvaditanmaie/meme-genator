import React, { useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/SavedMemes.css";
import domtoimage from "dom-to-image-more";

const SavedMemes = () => {
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const memes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    setSaved(memes);
  }, []);

  const handleDelete = (id) => {
    const updated = saved.filter((meme) => meme.id !== id);
    setSaved(updated);
    localStorage.setItem("savedMemes", JSON.stringify(updated));
  };

  const handleDownload = (memeId) => {
    const element = document.getElementById(`meme-${memeId}`);
    if (!element) return;

    domtoimage
      .toJpeg(element, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "meme.jpeg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Download failed:", err);
      });
  };
  useEffect(() => {
  axios.get("http://localhost:5000/api/memes").then((res) => {
    setSaved(res.data.memes);
  });
}, []);

  return (
    <div className="saved-memes-container">
      <div className="header d-flex justify-content-between align-items-center mb-4 px-3">
        <h2 className="saved-title">Your Saved Memes</h2>
        <Button
          variant="secondary"
          className="back-button"
          onClick={() => navigate("/edit")}
        >
          ← Go Back to Edit Page
        </Button>
      </div>

      {saved.length === 0 ? (
        <p className="text-center mt-4">No memes saved yet.</p>
      ) : (
        <div className="saved-grid">
          {saved.map((meme) => (
            <div className="saved-card" key={meme.id}>
              <div id={`meme-${meme.id}`} style={{ position: "relative" }}>
                <img
                  src={meme.url}
                  alt="Saved Meme"
                  className="saved-img"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>

              <div className="d-flex justify-content-between mt-2 gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    navigate(`/edit?url=${encodeURIComponent(meme.url)}`)
                  }
                >
                  Edit Again
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(meme.id)}
                >
                  Delete
                </Button>

                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleDownload(meme.id)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMemes;
