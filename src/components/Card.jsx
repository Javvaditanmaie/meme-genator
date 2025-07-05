import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from "../context/AuthContext";

const MemeCard = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get current user

  // ✅ handle edit with login check
  const handleEditClick = () => {
    if (user) {
      // Logged in → go to edit
      navigate(`/edit?url=${encodeURIComponent(props.img)}`);
    } else {
      // Not logged in → go to login, preserve redirect back to edit
      navigate(`/login?redirect=/edit?url=${encodeURIComponent(props.img)}`);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '12px' }}>
      {/* Image Wrapper */}
      <div style={{ height: '250px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={props.img}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button
          onClick={handleEditClick}
          variant="primary"
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MemeCard;
