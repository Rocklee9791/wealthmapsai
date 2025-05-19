// app/api/register/route.js
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { company_name, email, password, address } = body;

    if (!company_name || !email || !password || !address) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
      });
    }

    const conn = await pool.getConnection();
    const query = 'INSERT INTO companies (company_name, email, password, address) VALUES (?, ?, ?, ?)';
    await conn.query(query, [company_name, email, password, address]);
    conn.release();

    return new Response(JSON.stringify({ message: 'Company registered successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
