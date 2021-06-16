import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

import { Button, Container, Spinner, Table } from "react-bootstrap";
import { FaPenSquare, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import AddReviewModal from "../components/modals/AddReviewModal";
import ReviewDetailModal from "../components/modals/ReviewDetailModal";

import { publicAxios, authAxios } from "../services/axios.service";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [showModal, setShowModal] = useState("close");
  const [review, setReview] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const history = useHistory();

  const handleClose = () => setShowModal("close");
  const handleShowModalOne = () => setShowModal("modal-one");
  const handleShowModalTwo = () => setShowModal("modal-two");
  const handleChange = () => {
    setRefreshKey((key) => key + 1);
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await authAxios.delete(`/api/review/${id}`);
      history.push("/review");
      setLoading(false);
      handleChange();
    } catch (error) {
      return "error occured";
    }
  };

  const handleSelectData = (selectedRec) => {
    setSelectedData(selectedRec);
    handleShowModalTwo();
  };

  useEffect(() => {
    let isMounted = false;
    const FetchReview = async () => {
      await publicAxios
        .get("/api/review/")
        .then((result) => {
          setReview(result.data);
        })
        .catch((err) => console.log(err));
    };
    FetchReview();
    return () => {
      isMounted = true;
    };
  }, [refreshKey]);

  return (
    <Layout>
      <Container fluid style={{ overflowY: "auto", paddingTop: "10px" }}>
        <div className="d-flex flex-row-reverse">
          <Button
            variant="success"
            className="mb-2"
            onClick={handleShowModalOne}
          >
            <FaPlusCircle /> Add Testimonial
          </Button>
          <AddReviewModal
            onChange={handleChange}
            isShow={showModal}
            isClose={handleClose}
          />
        </div>
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Client</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {review.map((item) => (
              <tr key={item._id}>
                <td className="align-middle">{item.clientName}</td>
                <td className="align-middle">{item.projectName} </td>
                <td style={{ width: "200px" }} className="align-middle">
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleSelectData(item)}
                  >
                    <FaPenSquare />
                  </Button>
                  <ReviewDetailModal
                    onChange={handleChange}
                    entry={selectedData}
                    isShow={showModal}
                    isClose={handleClose}
                  />
                  <Button
                    onClick={() => handleDelete(item._id)}
                    variant="danger"
                    className="m-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      <FaTrashAlt />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default Review;
