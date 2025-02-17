import React, { useState } from "react";
import axios from "axios";
import "../styles/TaxForm.css";

const TaxForm = ({ setTaxResult }) => {
  const [formData, setFormData] = useState({
    annualIncome: "",
    investments: "",
    otherDeductions: "",
    otherIncome: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/calculate-tax",
        formData
      );
      setTaxResult(response.data);
    } catch (error) {
      console.error("Error calculating tax:", error);
    }
  };

  return (
    <form className="tax-form" onSubmit={handleSubmit}>
      <div>
        <label>Annual Income:</label>
        <input
          type="number"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Investments (80C, 80D, etc.):</label>
        <input
          type="number"
          name="investments"
          value={formData.investments}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Other Deductions (HRA, LTA, etc.):</label>
        <input
          type="number"
          name="otherDeductions"
          value={formData.otherDeductions}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Income from Other Sources:</label>
        <input
          type="number"
          name="otherIncome"
          value={formData.otherIncome}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Calculate Tax</button>
    </form>
  );
};

export default TaxForm;
