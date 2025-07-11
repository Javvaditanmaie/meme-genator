import React, { useState, createRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import Text from "../components/Text";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllmemes } from "../api/memes";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import domtoimage from "dom-to-image-more";

const Editpage = () => {
  const [params] = useSearchParams();
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const memeRef = createRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Load all meme templates
    getAllmemes().then((res) => setTemplates(res.data.memes));

    // Load meme from URL or sessionStorage
    const memeFromURL = params.get("url");
    const memeFromSession = sessionStorage.getItem("currentMeme");
    setImage(memeFromURL || memeFromSession || null);
  }, [params]);

  useEffect(() => {
    if (image) {
      sessionStorage.setItem("currentMeme", image);
    }
  }, [image]);

  const addText = () => {
    setTexts([...texts, { id: Date.now(), val: "Double click to edit" }]);
  };

  const updateText = (id, val) => {
    setTexts(texts.map((t) => (t.id === id ? { ...t, val } : t)));
  };

  const removeText = (id) => {
    setTexts(texts.filter((t) => t.id !== id));
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("currentMeme");
    await signOut(auth);
    navigate("/login");
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target.result);
          setTexts([]);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  // const handleSave = () => {
  //   if (!memeRef.current) return;

  //   domtoimage
  //     .toJpeg(memeRef.current, { quality: 0.95 })
  //     .then((dataUrl) => {
  //       const savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
  //       savedMemes.push({ id: Date.now(), url: dataUrl });
  //       localStorage.setItem("savedMemes", JSON.stringify(savedMemes));

  //       const link = document.createElement("a");
  //       link.href = dataUrl;
  //       link.download = "meme.jpeg";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);

  //       setSaveMessage(" Meme saved successfully!");
  //       setTimeout(() => setSaveMessage(""), 3000);
  //     })
  //     .catch((err) => {
  //       console.error("Save failed:", err);
  //       setSaveMessage(" Failed to save meme.");
  //     });
  // };

const handleSave = () => {
  if (!memeRef.current) return;

  domtoimage
    .toJpeg(memeRef.current, { quality: 0.95 })
    .then(async (dataUrl) => {
      // Save to MongoDB
      await axios.post("http://localhost:5000/api/memes", {
        url: dataUrl,
      });

      // Download image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "meme.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSaveMessage(" Meme saved to database!");
      setTimeout(() => setSaveMessage(""), 3000);
    })
    .catch((err) => {
  console.error("Save failed:", err.response ? err.response.data : err.message);
  setSaveMessage("❌ Failed to save meme.");
});

};


  const goToSavedMemes = () => {
    sessionStorage.setItem("currentMeme", image);
    navigate("/saved");
  };

  return (
    <div className="edit-page text-center">
      {/* Top Buttons */}
      <div className="d-flex justify-content-between align-items-center px-4 py-2">
        <div className="d-flex gap-2 ms-auto">
          <Button onClick={handleUpload} variant="primary">Upload Meme</Button>
          <Button onClick={handleLogout} variant="danger">Sign Out</Button>
        </div>
      </div>

      {/* Meme Editor */}
      <div
        className="meme-box"
        ref={memeRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        {image && <img src={image} width="500px" alt="Meme" />}
        {texts.map((text) => (
          <Text
            key={text.id}
            val={text.val}
            onChange={(val) => updateText(text.id, val)}
            onDelete={() => removeText(text.id)}
          />
        ))}
      </div>

      {/* Save Success Message */}
      {saveMessage && (
        <div style={{ marginTop: "10px", color: "green", fontWeight: "500" }}>
          {saveMessage}
        </div>
      )}

      {/* Action Buttons */}
      <div className="buttons my-3">
        <Button onClick={addText} variant="info" className="mx-2">Add Text</Button>
        <Button onClick={handleSave} variant="success" className="mx-2">Save</Button>
        <Button onClick={goToSavedMemes} variant="dark" className="mx-2">Saved Memes</Button>
        <Button onClick={() => navigate("/")} variant="secondary" className="mx-2">Go Home</Button>
      </div>

      {/* Meme Template Slider */}
      <div
        className="template-slider"
        style={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          padding: "10px",
          borderTop: "1px solid #ccc",
        }}
      >
        {templates.map((t, idx) => (
          <img
            key={idx}
            src={t.url}
            alt={t.name}
            onClick={() => setImage(t.url)}
            style={{
              height: "100px",
              margin: "0 10px",
              border: image === t.url ? "3px solid blue" : "2px solid transparent",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "border 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Editpage;
