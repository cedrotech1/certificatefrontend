import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button, Alert, Pagination, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        role: "user",
        gender: "",
        address: "",
        departmentId: "",
        rank: "",
        armyid: "",
        joindate: "",
        batarianId: "",
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [batarians, setBatarians] = useState([]);
    const usersPerPage = 10;
    const navigate = useNavigate();



    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                // Filter users based on role
                const filteredUsers = res.data.users.filter(
                    (user) => user.role === "user"
                );
                setUsers(filteredUsers);
            })
            .catch((err) => setError("Error fetching users: " + err.response?.data?.message || err.message));
    
     
           
    }, []);

 
    
  
    





    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setFormData({ ...user });
    };

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios
                .delete(`${process.env.REACT_APP_BASE_URL}/api/v1/users/delete/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    setUsers(users.filter((user) => user.id !== userId));
                    setSuccess("User deleted successfully!");
                    toast.success("User deleted successfully!");
                })
                .catch((err) =>  toast.error(err.response?.data?.message || err.message));
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleViewProfile = (id) => { navigate(`../other_user-profile/${id}`); }

    const handleClick = () => {
        
        navigate('/upload');
      };

    return (
        <div className="member" style={{ marginTop: '1cm' }}>

          
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

           

            <h2 className="text-center mb-4" style={{ backgroundColor: "lightgreen", padding: "10px", borderRadius: "6px", margin: '0.4cm' }}>
                List of students
            </h2>
              <div className="d-flex justify-content-end" style={{ marginBottom: '0.5cm' }}>
                                <Button onClick={handleClick} style={{ border: '1px solid green', backgroundColor: 'white', color: 'green', margin: '0.1cm' }}>upload file</Button>
            
                            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role ='user'? 'student':'Officer'}</td>
                            <td>{user.status}</td>
                            <td>
                              
                                <Button
                                    style={{ border: "1px solid red", backgroundColor: "white", color: "green", margin: '2px' }}
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {[...Array(Math.ceil(users.length / usersPerPage))].map((_, i) => (
                    <Pagination.Item key={i} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
                   <ToastContainer />
        </div>
    );
};

export default UsersPage;
