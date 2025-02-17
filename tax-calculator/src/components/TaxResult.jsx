import React from "react";
import "../styles/TaxResult.css";

const TaxResult = ({ taxResult }) => {
  if (!taxResult) return null;

  return (
    <div className="tax-result">
      <h2>Results</h2>
      <p>Taxable Income: ₹{taxResult.taxableIncome}</p>
      <p>Tax Payable: ₹{taxResult.taxPayable}</p>
    </div>
  );
};

export default TaxResult;
