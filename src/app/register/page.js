// app/register/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const [company_name, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name, email, password, address }),
    });

    const data = await res.json();

    if (res.status === 201) {
      setMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000); // wait 2 seconds before redirect
    } else {
      setMessage(data.error || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register Company</h2>
        <input
          type="text"
          placeholder="Company Name"
          value={company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <textarea
          placeholder="Company Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Link href='/dashboard'>
        <button type="submit">Register</button></Link>
        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  );
}
