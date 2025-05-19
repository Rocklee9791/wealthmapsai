import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error('DB Connection Error:', err);
  else console.log('Connected to MySQL');
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.query('SELECT * FROM companies', (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      return res.status(200).json(results);
    });
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    db.query('DELETE FROM companies WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: 'Delete failed' });
      return res.status(200).json({ message: 'Deleted successfully' });
    });
  } else if (req.method === 'PUT') {
    const { id, approved } = req.body;
    db.query('UPDATE companies SET approved = ? WHERE id = ?', [approved, id], (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      return res.status(200).json({ message: 'Approval status updated' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}