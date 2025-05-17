// pages/api/register.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// Disable default body parser for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true;
  form.maxFileSize = 10 * 1024 * 1024; // 10MB

  fs.mkdirSync(form.uploadDir, { recursive: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form error:', err);
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    const { name, email, website, description, industry, location } = fields;
    const logoFile = files.logo;

    if (!name || !email || !logoFile) {
      return res.status(400).json({ error: 'Name, email, and logo are required' });
    }

    const logoFilename = path.basename(logoFile[0].filepath);

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'anand9791',
        database: 'company_db',
      });

      const query = `
        INSERT INTO companies 
        (name, email, website, description, industry, location, logo) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await connection.execute(query, [
        name[0],
        email[0],
        website?.[0] || null,
        description?.[0] || null,
        industry?.[0] || null,
        location?.[0] || null,
        `/uploads/${logoFilename}`,
      ]);

      await connection.end();

      res.status(200).json({ message: 'Company registered successfully' });
    } catch (error) {
      console.error('DB error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
}
