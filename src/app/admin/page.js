'use client';
import './admin.css';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

export default function AdminPanel() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE,
        highlightColor: 0xff8c00,
        midtoneColor: 0x333333,
        lowlightColor: 0x000000,
        baseColor: 0x111111,
        blurFactor: 0.5,
        speed: 1,
        zoom: 1,
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const fetchCompanies = async () => {
    const res = await fetch('/api/admin/companies');
    const data = await res.json();
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this company?')) return;
    const res = await fetch(`/api/admin/companies?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchCompanies();
  };

  const toggleApproval = async (id, currentStatus) => {
    const res = await fetch('/api/admin/companies', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved: currentStatus ? 0 : 1 })
    });
    if (res.ok) fetchCompanies();
  };

  return (
    <div ref={vantaRef} className="admin-bg">
      <div className="admin-container">
        <h1>Admin Panel</h1>
        <p>Manage all registered companies</p>
        <div className="company-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.company_name}</td>
                  <td>{company.email}</td>
                  <td>{company.address}</td>
                  <td>
                    <button
                      className={company.approved ? 'approved' : 'pending'}
                      onClick={() => toggleApproval(company.id, company.approved)}
                    >
                      {company.approved ? '✅ Approved' : '⏳ Pending'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(company.id)}>❌ Delete</button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr><td colSpan="6">No companies found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}