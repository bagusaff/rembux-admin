import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useHistory } from "react-router-dom";
import { Button, Container, Image, Table, Spinner } from "react-bootstrap";
import { FaPenSquare, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

import ProjectDetailModal from "../components/modals/ProjectDetailModal";
import AddProjectModal from "../components/modals/AddProjectModal";

import { publicAxios, authAxios } from "../services/axios.service";
const Project = () => {
  const [showModal, setShowModal] = useState("close");
  const [project, setProject] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const history = useHistory();

  const handleClose = () => setShowModal("close");
  const handleShowModalOne = () => setShowModal("modal-one");
  const handleShowModalTwo = () => setShowModal("modal-two");

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await authAxios.delete(`/api/project/${id}`);
      setRefreshKey((key) => key + 1);
      history.push("/project");
      setLoading(false);
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
    const FetchProject = async () => {
      await publicAxios
        .get("/api/project/")
        .then((result) => {
          setProject(result.data);
        })
        .catch((err) => console.log(err));
    };
    FetchProject();
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
            <FaPlusCircle /> Add Project
          </Button>
          <AddProjectModal isShow={showModal} isClose={handleClose} />
        </div>
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Judul Projek</th>
              <th>Tipe Projek</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {project.map((item) => (
              <tr key={item._id}>
                <td style={{ width: "200px" }}>
                  <Image src={item.thumbnail} fluid thumbnail />
                </td>
                <td className="align-middle">{item.title}</td>
                <td className="align-middle">{item.description}</td>
                <td style={{ width: "200px" }} className="align-middle">
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleSelectData(item)}
                  >
                    <FaPenSquare />
                  </Button>
                  <ProjectDetailModal
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

export default Project;
