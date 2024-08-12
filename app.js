const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const Blog = require('./models/Blog'); // Assuming you have created this model

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Configure Multer storage
const storage = multer.diskStorage({
    destination: './public/uploads/', // Upload directory
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Route to handle form submission
app.post('/submit', upload.single('image'), (req, res) => {
    const newBlog = new Blog({
        username: req.body.username,
        useremail: req.body.useremail,
        blogheading: req.body.blogheading,
        image: req.file ? '/uploads/' + req.file.filename : '', // Save the relative path
        message: req.body.message
    });

    newBlog.save()
        .then(() => res.send('Blog saved successfully'))
        .catch(err => res.status(400).send('Error saving blog: ' + err));
});

// Root route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
});