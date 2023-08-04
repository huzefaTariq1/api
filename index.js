const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }
  return res.status(200).json({ message: 'Image uploaded successfully.' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
