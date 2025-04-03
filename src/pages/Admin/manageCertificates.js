import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const CertificateGenerator = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQzNjI0NDM2LCJleHAiOjE3NDYyMTY0MzZ9.R_vizOvUAdIZMjCtIG6BxfWoxzomwoNBWW66U2S-0g0" },
      })
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const generateAllCertificates = () => {
    const doc = new jsPDF({ orientation: "landscape", format: "a4" });
    users.forEach((user, index) => {
      let title = "Mr.";
      if (user.gender === "female") {
        title = user.maritalStatus === "married" ? "Mrs." : "Miss";
      }

      doc.addImage(
        "http://res.cloudinary.com/dzl8xve8s/image/upload/v1743627256/Card/oxxyigigpiqx3xeexzpx.png",
        "JPEG",
        0,
        0,
        297,
        210
      );

      doc.setFontSize(24);
      doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 50, { align: "center" });
      doc.setFontSize(18);
      doc.text("PROUDLY PRESENTED TO", 148, 70, { align: "center" });
      doc.setFontSize(26);
      doc.text(`${title} ${user.firstname} ${user.lastname}`, 148, 90, { align: "center" });
      doc.setFontSize(14);
      doc.text("In recognition of your dedication and hard work.", 148, 110, { align: "center" });

      if (index < users.length - 1) doc.addPage();
    });
    doc.save("All_Certificates.pdf");
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Generated Certificates</h1>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 mb-4">
            <div
              className="certificate p-5 text-center"
              style={{
                backgroundImage:
                  "url('http://res.cloudinary.com/dzl8xve8s/image/upload/v1743627256/Card/oxxyigigpiqx3xeexzpx.png')",
                backgroundSize: "cover",
                width: "100%",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
              }}
            >
              <h2>CERTIFICATE OF ACHIEVEMENT</h2>
              <p>PROUDLY PRESENTED TO</p>
              <h1>{user.firstname} {user.lastname}</h1>
              <p>In recognition of your dedication and hard work.</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={generateAllCertificates}
      >
        Download All Certificates
      </button>
    </div>
  );
};

export default CertificateGenerator;