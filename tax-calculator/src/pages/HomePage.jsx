import React, { useState } from "react";
import TaxForm from "../components/TaxForm";
import TaxResult from "../components/TaxResult";

const HomePage = () => {
  const [taxResult, setTaxResult] = useState(null);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Tax Calculator</h1>
      <TaxForm setTaxResult={setTaxResult} />
      <TaxResult taxResult={taxResult} />
    </div>
  );
};

export default HomePage;
