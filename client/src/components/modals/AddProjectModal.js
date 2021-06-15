import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

// import { useHistory } from "react-router-dom";

import { authAxios } from "../../services/axios.service";

const AddProjectModal = ({ isShow, isClose }) => {
  const cloudinary_id = process.env.REACT_APP_CLOUDINARY_ID;
  const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_PRESET_PROJECT;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      type: "",
      description: "",
      thumbnail: "",
    },
  });

  const onSubmit = async (data, e) => {
    const { files } = document.querySelector('input[type="file"]');
    console.log(data);
    if (
      data.files !== undefined ||
      data.files !== null ||
      data.files !== "" ||
      !data.files
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", files[0]);
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
        .catch((err) => console.log(err));
    } else {
      data.thumbnail = "";
    }

    try {
      setLoading(true);
      await authAxios
        .post("/api/project/", data)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
        })
        .catch((e) => {
          console.log(e);
        });
      setLoading(false);
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={isShow === "modal-one"} onHide={isClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Tambahkan Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form encType="multipart/form-data">
          {success && (
            <Alert variant="success" onClose={() => setSuccess(false)}>
              <Alert.Heading>Berhasil!</Alert.Heading>
              <p>Projek berhasil ditambahkan!</p>
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
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Form.Control type="text" onChange={onChange} value={value} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Jenis Projek : </Form.Label>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <Form.Control as="select" onChange={onChange} value={value}>
                  <option value=""> </option>
                  <option value="web apps">Web Apps</option>
                  <option value="mobile apps">Mobile Apps</option>
                  <option value="landing page">Landing Page</option>
                </Form.Control>
              )}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Deskripsi Projek</Form.Label>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Form.Group>
          <Form.Group>
            <label>Gambar Projek</label>
            <br />
            <Controller
              control={control}
              name="thumbnail"
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  type="file"
                  id="thumbnail"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Group>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <span>Upload</span>
          )}
        </Button>
        <Button onClick={isClose} disabled={loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProjectModal;
