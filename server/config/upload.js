// config/upload.js  (create this helper file)
const path   = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'bundles'));
  },
  filename: (req, file, cb) => {
    // e.g. 1629876543210-originalName.jpg
    const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '');
    cb(null, unique);
  }
});

const fileFilter = (req, file, cb) => {
  if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },      // 10 MB per file
  fileFilter
});
