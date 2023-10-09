import React, { useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import mockData from "../../api/mock/mock.component";

function UserManagement() {
  const [users, setUsers] = useState(mockData);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [editedUser, setEditedUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [registeredUser, setRegisteredUser] = useState(null);

  const addUser = () => {
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers([...users, newUserWithId]);
    setNewUser({ name: "", lastname: "", email: "", password: "" });
    setShowAddUserModal(false);
  };

  const editUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditedUser(userToEdit);
    setShowEditUserModal(true);
  };

  const saveEditedUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setEditedUser({
      id: null,
      name: "",
      lastname: "",
      email: "",
      password: "",
    });
    setShowEditUserModal(false);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <Container className="user-container">
      <h1>مدیریت کاربران</h1>
      <div className="table-responsive">
        <Table className="table" striped bordered hover>
          <thead>
            <tr>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>ایمیل</th>
              <th>رمز عبور</th>
              <th>ویرایش و حذف</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Button variant="primary" onClick={() => editUser(user.id)}>
                    ویرایش
                  </Button>{" "}
                  <Button variant="danger" onClick={() => deleteUser(user.id)}>
                    حذف
                  </Button>
                </td>
              </tr>
            ))}

            {registeredUser && (
              <tr key={registeredUser.id}>
                <td>{registeredUser.name}</td>
                <td>{registeredUser.lastname}</td>
                <td>{registeredUser.email}</td>
                <td>{registeredUser.password}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal
        className="modal"
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label className="mt-3">نام</Form.Label>
              <Form.Control
                type="text"
                placeholder="نام را وارد کنید"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label className="mt-3">نام خانوادگی</Form.Label>
              <Form.Control
                type="text"
                placeholder="نام خانوادگی را وارد کنید"
                value={newUser.lastname}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="mt-3">ایمیل</Form.Label>
              <Form.Control
                type="email"
                placeholder="ایمیل را وارد کنید"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="mt-3">رمز عبور</Form.Label>
              <Form.Control
                type="number"
                placeholder="رمز عبور را وارد کنید"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => setShowAddUserModal(false)}
          >
            انصراف
          </Button>
          <Button variant="success" onClick={addUser}>
            افزودن
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditUserModal}
        onHide={() => setShowEditUserModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title> ویرایش کاربر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>نام</Form.Label>
              <Form.Control
                type="text"
                placeholder="نام را وارد کنید"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>نام خانوادگی</Form.Label>
              <Form.Control
                type="text"
                placeholder="نام خانوادگی را وارد کنید"
                value={editedUser.lastname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>ایمیل</Form.Label>
              <Form.Control
                type="email"
                placeholder="ایمیل را وارد کنید"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>رمز عبور</Form.Label>
              <Form.Control
                type="number"
                placeholder="رمز عبور را وارد کنید"
                value={editedUser.password}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditUserModal(false)}
          >
            انصراف
          </Button>
          <Button variant="primary" onClick={saveEditedUser}>
            ذخیره
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        onClick={() => setShowAddUserModal(true)}
        className="d-flex justify-content-center mx-auto  py-2 px-4"
        variant="warning"
      >
        {" "}
        افزودن کاربر
      </Button>
    </Container>
  );
}

export default UserManagement;
