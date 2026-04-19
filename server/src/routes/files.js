const router = require('express').Router();
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', async (_req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM files WHERE is_public = TRUE ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { name, description, appwrite_id, category, is_public } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO files (name, description, appwrite_id, category, is_public, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, appwrite_id, category, is_public ?? true, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM files WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
