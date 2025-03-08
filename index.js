const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Education Server!');
});
app.post("/send-email", async (req, res) => {
    const { name, email, type, phone, location } = req.body;
  
    try {
      await sendMail(name, email, type, phone, location);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
