import React, { useState } from "react";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";

import { authAxios } from "../../services/axios.service";

const AddReviewModal = ({ isShow, isClose }) => {
  const cloudinary_id = process.env.REACT_APP_CLOUDINARY_ID;
  const cloudinary_preset = process.env.REACT_APP_CLOUDINARY_PRESET_REVIEW;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      clientName: "",
      projectName: "",
      rating: "",
      description: "",
      photo: "",
    },
  });

  const onSubmit = async (data, e) => {
    const { files } = document.querySelector('input[type="file"]');
    console.log(files);
    if (files.length !== 0) {
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
          data.photo = imgUrl;
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      data.photo = "";
    }

    try {
      setLoading(true);
      await authAxios
        .post("/api/review/", data)
        .then((res) => {
          setSuccess(true);
        })
        .catch((e) => {
          console.log(e);
        });
      setLoading(false);
      reset();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={isShow === "modal-one"} onHide={isClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Tambah Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data">
          {success && (
            <Alert variant="success" onClose={() => setSuccess(false)}>
              <Alert.Heading>Berhasil!</Alert.Heading>
              <p>Review berhasil ditambahkan!</p>
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
          <Form.Group controlId="clientName">
            <Form.Label>Nama Client</Form.Label>
            <Controller
              control={control}
              name="clientName"
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Nama Client"
                />
              )}
            />
          </Form.Group>
          <Form.Group controlId="projectName">
            <Form.Label>Nama Project</Form.Label>
            <Controller
              control={control}
              name="projectName"
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  type="text"
                  placeholder="Nama Project"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Tinggalkan Rating : </Form.Label>
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value } }) => (
                <Form.Control as="select" onChange={onChange} value={value}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Control>
              )}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Kalimat Review</Form.Label>
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
            <label>Foto Client</label>
            <br />
            <Controller
              control={control}
              name="photo"
              render={({ field }) => <Form.Control type="file" id="photo" />}
            />
          </Form.Group>
        </Form>
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

export default AddReviewModal;
