import React from "react";

const LandingPage = () => {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundImage: "url('http://res.cloudinary.com/dzl8xve8s/image/upload/v1743627256/Card/oxxyigigpiqx3xeexzpx.png')", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "3rem", color: "white", textShadow: "2px 2px 5px black" }}>
        Welcome to Our Platform
      </h1>
      <p style={{ fontSize: "1.5rem", color: "white", textShadow: "1px 1px 3px black", marginBottom: "20px" }}>
        Your journey starts here.
      </p>
      <a 
        href="/login" 
        style={{ 
          padding: "12px 30px", 
          fontSize: "1.2rem", 
          color: "white", 
          background: "green", 
          borderRadius: "8px", 
          textDecoration: "none", 
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)"
        }}
      >
        Login
      </a>
    </div>
  );
};

export default LandingPage;
