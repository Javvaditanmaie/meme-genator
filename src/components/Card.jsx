import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from "../context/AuthContext";

const MemeCard = ({ img, title }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEditClick = () => {
    if (user) {
      navigate(`/edit?url=${encodeURIComponent(img)}`);
    } else {
      const redirectURL = encodeURIComponent(`/edit?url=${img}`);
      navigate(`/login?redirect=${redirectURL}`);
    }
  };

  return (
    <Card style={{ width: '20rem', height: '400px', margin: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ height: '250px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={img}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Card.Title style={{ fontSize: '18px', textAlign: 'center'}}>{title}</Card.Title>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
          <Button onClick={handleEditClick} variant="primary" >
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MemeCard;
