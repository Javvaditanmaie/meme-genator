import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/SavedMemes.css";
import domtoimage from "dom-to-image-more";
import axios from "axios";
import { auth } from "../firebase";

const SavedMemes = () => {
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchSavedMemes = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const res = await axios.get(`http://localhost:5000/api/memes?userId=${userId}`);
    setSaved(res.data.memes);
  };
  fetchSavedMemes();
}, []);


  const handleDelete = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/memes/${id}`);
    if (res.data.success) {
      setSaved((prev) => prev.filter((meme) => meme._id !== id));
    } else {
      console.error("Delete failed on backend");
    }
  } catch (err) {
    console.error("Failed to delete meme:", err);
  }
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
            <div className="saved-card" key={meme._id}>
              <div id={`meme-${meme._id}`} style={{ position: "relative" }}>
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
                  onClick={() => handleDelete(meme._id)}
                >
                  Delete
                </Button>

                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleDownload(meme._id)}
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
