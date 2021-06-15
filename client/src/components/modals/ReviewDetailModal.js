import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner, Image } from "react-bootstrap";
import axios from "axios";
import { authAxios } from "../../services/axios.service";

const ReviewDetailModal = ({ entry, isShow, isClose }) => {
  const cloudinary_id = process.env.REACT_APP_CLOUDINARY_ID;
  const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_PRESET_REVIEW;

  const [loading, setLoading] = useState(false);

  const [editedData, setEditedData] = useState({
    id: entry._id,
    clientName: entry.clientName,
    projectName: entry.projectName,
    rating: entry.rating,
    description: entry.description,
    photo: entry.photo,
  });

  useEffect(() => {
    setEditedData(entry);
  }, [entry]);

  const onSubmit = async (data) => {
    // if there is photo selected , upload to cloudinary first then get the img url
    if (editedData.photo !== "") {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", editedData.photo);
      formData.append("upload_preset", cloudinary_preset);
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudinary_id}/image/upload`,
          formData
        )
        .then((result) => {
          const img = result.data;
          const imgUrl = img.secure_url;
          data.photo = imgUrl;
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      data.photo = null;
    }

    //make update request to the api with the data + recent uploaded img url
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("clientName", editedData.clientName);
      formData.append("projectName", editedData.projectName);
      formData.append("rating", editedData.rating);
      formData.append("description", editedData.description);
      formData.append("photo", data.photo ? data.photo : editedData.photo);

      await authAxios
        .put(`/api/review/${entry._id}`, formData)
        .then((res) => {
          console.log(res);
          setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setEditedData({ ...editedData, photo: e.target.files[0] });
  };
  return (
    <Modal show={isShow === "modal-two"} onHide={isClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} encType="multipart/form-data">
          <Form.Group controlId="clientName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama Anda"
              name="clientName"
              defaultValue={entry.clientName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              defaultValue={entry.projectName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Tinggalkan Rating : </Form.Label>
            <Form.Control
              as="select"
              name="rating"
              defaultValue={entry.rating}
              onChange={handleChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Kalimat Review</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="description"
              rows={3}
              defaultValue={entry.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <label>Foto Client</label>
            <Form.File
              type="file"
              name="photo"
              accept=".png, .jpg, .jpeg"
              onChange={handlePhoto}
            />
            <br />
            {entry.photo && (
              <Image src={entry.photo} width={150} height={150} />
            )}
            <span>Current Photo {!entry.photo && <span>is empty</span>}</span>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <span>Save</span>
          )}
        </Button>
        <Button onClick={isClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewDetailModal;
