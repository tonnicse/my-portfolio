const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');
const nodemailer  = require('nodemailer');

const app = express();

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// POST /contact endpoint (optional: for a contact form)
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // configure transporter with your credentials (e.g. Gmail, SendGrid)
    let transporter = nodemailer.createTransport({
      service: 'tonni.cse59@gmail.com',
      auth: {
        user: 'tonni.cse59@gmail.com',
        pass: 'cse1234*@#&TONNI'
      }
    });
    await transporter.sendMail({
      from: email,
      to:   'tonni.cse59@gmail.com',
      subject: `Portfolio contact from ${name}`,
      text: message
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ success: false });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`));
