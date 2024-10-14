const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');  // Import CORS

// Import models
const Blog = require('./models/Blog');
const Post = require('./models/Post');
const Dance = require('./models/Dance');
const Heritage = require('./models/Heritage');
const Musics = require('./models/Musics');
const User = require('./models/User');  // User model
const Profile = require('./models/Profile');  // Profile model

// Import routes
const musicRoutes = require('./routes/musicRoutes');
const danceRoutes = require('./routes/danceRoutes');
const heritageRoutes = require('./routes/heritageRoutes');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // Use CORS

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/tard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Configure Multer storage for blog images
const blogStorage = multer.diskStorage({
    destination: './public/uploads/', // Upload directory for blogs
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadBlog = multer({ storage: blogStorage });

// Configure Multer storage for posts
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Upload directory for posts
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});
const uploadPost = multer({ storage: postStorage });

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes for authentication (from the first project)
app.use('/api/auth', authRoutes);

// Use the music routes
app.use('/music', musicRoutes); // Mount the music routes at /music

// Use the dance routes
app.use('/dance', danceRoutes); // Mount the dance routes at /dance

// Use the heritage routes
app.use('/heritage', heritageRoutes); // Mount the heritage routes at /heritage

// Use the profile routes
app.use('/profile', profileRoutes);

// Route to handle blog form submission
app.post('/submit', uploadBlog.single('image'), (req, res) => {
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

// Route to serve the home page (home.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Route to serve the dance page
app.get('/dance', async (req, res) => {
    try {
        const dances = await Dance.find(); // Fetch dance data from the database
        res.render('dance', { dances }); // Render the dance.ejs with dance data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching dance data');
    }
});

// Route to serve the blog posts page (index.ejs from the second project)
app.get('/blogpost', (req, res) => {
    Post.find().then(posts => {
        res.render('index', { posts });
    }).catch(err => {
        console.log(err);
        res.status(500).send('An error occurred while fetching posts.');
    });
});

// Handle post submissions with file upload (second project)
app.post('/post', uploadPost.single('photo'), (req, res) => {
    const newPost = new Post({
        topic: req.body.topic,
        username: req.body.username,
        email: req.body.email,
        photo: req.file ? '/uploads/' + req.file.filename : '', // Store the path to the uploaded file
        paragraph: req.body.paragraph
    });

    newPost.save()
        .then(() => res.redirect('/blogpost')) // Redirect to the blogpost page after saving
        .catch(err => {
            console.log(err);
            res.status(500).send('An error occurred while saving the post.');
        });
});

// API route for fetching more posts (optional for infinite scroll)
app.get('/api/posts', (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 2;
    Post.find().skip(offset).limit(limit).then(posts => {
        res.json(posts);
    }).catch(err => {
        console.log(err);
        res.status(500).send('An error occurred while fetching posts.');
    });
});

// Search routes for music
app.get('/search', async (req, res) => {
    const query = req.query.q || ''; // Get the search query from the URL
    try {
        // Use the Musics model and update the regex to check for the start of the string
        const filteredMusic = await Musics.find({
            name: { $regex: new RegExp(`^${query}`, 'i') } // Updated to use Musics and RegExp
        });
        res.json(filteredMusic); 
    } catch (error) {
        console.error('Error fetching filtered music:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Search routes for heritage
app.get('/searchHeritage', async (req, res) => {
    const query = req.query.q || ''; // Get the search query from the URL
    try {
        // Use the Heritage model and update the regex to search for matching site names
        const filteredHeritage = await Heritage.find({
            siteName: { $regex: new RegExp(`^${query}`, 'i') } // Search starting with the query (case-insensitive)
        });
        res.json(filteredHeritage);
    } catch (error) {
        console.error('Error fetching filtered heritage sites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
