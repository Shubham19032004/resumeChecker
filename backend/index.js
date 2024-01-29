
const express = require("express");
const { gemini } = require("./Gemini");
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const pdfParse = require('pdf-parse');
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed"), false);
    }
  }
});

app.post("/", upload.single('pdf'), async (req, res) => {
  try {
    const { detail } = req.body;
    const pdfBuffer = req.file.buffer;
    // return res.json({detail})
    if (detail!==null && pdfBuffer!=null) {
        const pdfData = await pdfParse(pdfBuffer);
        const pdfText = pdfData.text;
          let data = await gemini(detail, applicantResume = pdfText);
      return res.json({ data });
    } else {
      res.status(400).json({ error: 'Invalid data' });
    }
  } catch (error) {
    console.error("Error in the route handler:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
