import React, { useState, createRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import Text from "../components/Text";
import { useSearchParams, useNavigate } from "react-router-dom";
import { exportComponentAsJPEG } from "react-component-export-image";
import { getAllmemes } from "../api/memes"; // or your own API method

const Editpage = () => {
  const [params] = useSearchParams();
  const [image, setImage] = useState(params.get("url")); // 👈 now it's a state
  const [texts, setTexts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const memeRef = createRef();
  const navigate = useNavigate();

  useEffect(() => {
    getAllmemes().then(res => setTemplates(res.data.memes)); // 👈 load memes
  }, []);

  const addText = () => {
    setTexts([...texts, { id: Date.now(), val: "Double click to edit" }]);
  };

  const updateText = (id, val) => {
    setTexts(texts.map(t => (t.id === id ? { ...t, val } : t)));
  };

  const removeText = (id) => {
    setTexts(texts.filter(t => t.id !== id));
  };

  return (
    <div className="edit-page text-center">
      <div className="meme-box" ref={memeRef} style={{ position: "relative", display: "inline-block" }}>
        <img src={image} width="500px" alt="Meme" />
        {texts.map(text => (
          <Text
            key={text.id}
            val={text.val}
            onChange={(val) => updateText(text.id, val)}
            onDelete={() => removeText(text.id)}
          />
        ))}
      </div>

      <div className="buttons my-3">
        <Button onClick={addText} variant="info" className="mx-2">Add Text</Button>
        <Button onClick={() => exportComponentAsJPEG(memeRef)} variant="success" className="mx-2">Save</Button>
        <Button onClick={() => navigate("/")} variant="secondary" className="mx-2">Go Home</Button>
      </div>

      {/* ✅ Meme Template Slider */}
      <div className="template-slider" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', padding: "10px", borderTop: "1px solid #ccc" }}>
        {templates.slice(0, 20).map((t, idx) => (
          <img
            key={idx}
            src={t.url}
            alt={t.name}
            onClick={() => setImage(t.url)}
            style={{
              height: '100px',
              margin: '0 10px',
              border: image === t.url ? '3px solid blue' : '2px solid transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'border 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Editpage;
