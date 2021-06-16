import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner, Image, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { authAxios } from "../../services/axios.service";

const ProjectDetailModal = ({ onChange, entry, isShow, isClose }) => {
  const cloudinary_id = process.env.REACT_APP_CLOUDINARY_ID;
  const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_PRESET_PROJECT;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [editedData, setEditedData] = useState({
    id: entry._id,
    title: entry.title,
    type: entry.type,
    description: entry.description,
    thumbnail: entry.thumbnail,
  });

  useEffect(() => {
    setEditedData(entry);
  }, [entry]);

  const onSubmit = async (data) => {
    // if there is thumbnail selected , upload to cloudinary first then get the img url
    if (editedData.thumbnail !== "") {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", editedData.thumbnail);
      formData.append("upload_preset", cloudinary_preset);
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudinary_id}/image/upload`,
          formData
        )
        .then((result) => {
          const img = result.data;
          const imgUrl = img.secure_url;
          data.thumbnail = imgUrl;
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      data.thumbnail = null;
    }

    //make update request to the api with the data + recent uploaded img url
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", editedData.title);
      formData.append("type", editedData.type);
      formData.append("description", editedData.description);
      formData.append(
        "thumbnail",
        data.thumbnail ? data.thumbnail : editedData.thumbnail
      );

      await authAxios
        .put(`/api/project/${entry._id}`, formData)
        .then((res) => {
          console.log(res);
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
      history.push("/project");
      onChange();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e) => {
    setEditedData({ ...editedData, thumbnail: e.target.files[0] });
  };
  return (
    <Modal show={isShow === "modal-two"} onHide={isClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} encType="multipart/form-data">
          {success && (
            <Alert variant="success" onClose={() => setSuccess(false)}>
              <Alert.Heading>Berhasil!</Alert.Heading>
              <p>Project berhasil diperbarui!</p>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline-success"
                >
                  Sembunyikan notifikasi
                </Button>
              </div>
            </Alert>
          )}
          <Form.Group controlId="title">
            <Form.Label>Judul Project</Form.Label>
            <Form.Control
              type="text"
              placeholder="Judul Projek"
              name="title"
              defaultValue={entry.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Tinggalkan Rating : </Form.Label>
            <Form.Control
              as="select"
              name="type "
              defaultValue={entry.type}
              onChange={handleChange}
            >
              <option value="Web Apps">Web Apps</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="Landing Page">Landing Page</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Deskripsi Projek</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              defaultValue={entry.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <label>Foto Anda</label>
            <Form.File
              type="file"
              name="thumbnail"
              accept=".png, .jpg, .jpeg"
              onChange={handleThumbnail}
            />
            <br />
            {entry.thumbnail && (
              <Image src={entry.thumbnail} width={150} height={150} />
            )}
            <span>
              Current Thumbnail {!entry.thumbnail && <span>is empty</span>}
            </span>
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

export default ProjectDetailModal;
