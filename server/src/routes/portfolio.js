const router = require('express').Router();
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', async (_req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM portfolio_projects ORDER BY display_order ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { title, description, tech_stack, repo_url, live_url, display_order } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO portfolio_projects (title, description, tech_stack, repo_url, live_url, display_order)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, tech_stack, repo_url, live_url, display_order ?? 0]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { title, description, tech_stack, repo_url, live_url, display_order } = req.body;
  try {
    const result = await db.query(
      `UPDATE portfolio_projects
       SET title=$1, description=$2, tech_stack=$3, repo_url=$4, live_url=$5, display_order=$6
       WHERE id=$7 RETURNING *`,
      [title, description, tech_stack, repo_url, live_url, display_order, req.params.id]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM portfolio_projects WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
