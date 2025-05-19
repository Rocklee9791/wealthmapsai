'use client';
import './dashboard.css';
import { FaUsers, FaUserShield, FaChartBar, FaBell } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

export default function Dashboard() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE: THREE,
        highlightColor: 0xe0ffff,  // Light Cyan (glow of sunlight on water)
midtoneColor: 0x00ced1,    // Dark Turquoise (clean ocean water)
lowlightColor: 0x4682b4,   // Steel Blue (depth and contrast)
baseColor: 0xf0ffff,
        blurFactor: 0.6,
        speed: 1.2,
        zoom: 0.9,
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="dashboard-bg">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to Your Company Dashboard</h1>
          <p>Manage everything from employees to analytics</p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <FaUsers className="icon" />
            <h2>Manage Employees</h2>
            <p>View, add, or remove employee records.</p>
          </div>

          <div className="card">
            <FaUserShield className="icon" />
            <h2>Roles & Permissions</h2>
            <p>Assign roles and control access levels.</p>
          </div>

          <div className="card">
            <FaChartBar className="icon" />
            <h2>Analytics</h2>
            <p>Track company performance and reports.</p>
          </div>

          <div className="card">
            <FaBell className="icon" />
            <h2>Notifications</h2>
            <p>Receive company-wide alerts and updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
