'use client';
import '../register-company/register-company.css';
import { useState } from 'react';

export default function RegisterCompany() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    description: '',
    industry: '',
    location: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (!formData.name || !formData.email || !formData.logo) {
      alert('Please fill in all required fields (Name, Email, Logo)');
      return;
    }

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const res = await fetch('/api/register', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();

      if (res.ok) {
        alert('Company registered successfully!');
        setFormData({
          name: '',
          email: '',
          website: '',
          description: '',
          industry: '',
          location: '',
          logo: null,
        });
      } else {
        alert('Registration failed: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register Company</h2>

        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Company Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="website"
          placeholder="Website (Optional)"
          value={formData.website}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        ></textarea>

        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          name="logo"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
