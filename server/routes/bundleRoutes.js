const express = require('express');
const { createBundle, getBundles, updateBundle, deleteBundle } = require('../controllers/bundleController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', createBundle);
router.get('/', getBundles);
router.put('/', updateBundle);
router.delete('/:id', deleteBundle)

module.exports = router;