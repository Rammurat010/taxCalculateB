import React from "react";

const AboutPage = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>About Tax Calculator</h1>
      <p>
        This is a simple tax calculator application built with React.js and
        Node.js. It helps users calculate their taxable income and tax payable
        based on Indian tax slabs.
      </p>
    </div>
  );
};

export default AboutPage;
