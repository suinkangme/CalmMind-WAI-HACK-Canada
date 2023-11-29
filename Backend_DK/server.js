// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
app.set('view engine', 'ejs')
const multer = require('multer');
app.use('/public', express.static('public'));
const cors = require('cors');
app.use(cors());
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// mongoose models
const Counter = require('./models/counter');
const Post = require('./models/post');



// connect to mongodb
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(process.env.PORT, function () {
  console.log('Server is listening on port ' + process.env.PORT);
});


// method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// GET 
app.get('/', function (request, response) {
  response.render('index.ejs');
});

app.get('/write', function (request, response) {
  response.render('write.ejs');
});

app.get('/record', function (request, response) {
  response.render('record.ejs');
});


app.get('/login', function (request, response) {
  response.render('login.ejs');
});

app.get('/signup', function (request, response) {
  response.render('signup.ejs');
});

app.get('/map', function (request, response) {
  response.render('map.ejs');
});



// detail page
app.get('/detail/:id', function (request, response) {
  Post.findById(request.params.id)
    .then(result => {
      if (!result) {
        // Handle the case where the post with the given ID doesn't exist
        response.status(404).send("Post not found");
        return;
      }

      // console.log(result);
      response.render('detail.ejs', { detailData: result });
    })
    .catch(err => {
      console.error(err);
      // Handle the error, for example, by sending a response to the client
      response.status(500).send("Error occurred");
    });
});


// edit page
app.get('/edit/:id', function (request, response) {
  Post.findById(request.params.id)
    .then(result => {
      if (!result) {
        // Handle case where no post is found
        response.status(404).send("Post not found");
        return;
      }
      response.render('edit.ejs', { editData: result });
    })
    .catch(error => {
      console.error('Error finding post:', error);
      response.status(500).send("Error finding the post");
    });
});


//submit in edit page
app.put('/edit', function (request, response) {
  const postId = request.body.id;

  const updatedData = {
    title: request.body.title,
    date: request.body.date
  };

  Post.updateOne({ _id: postId }, { $set: updatedData })
    .then(result => {
      console.log('Update complete');
      response.redirect('/detail/' + postId);
    })
    .catch(error => {
      console.error('Error updating:', error);
      response.status(500).send("Error updating the post");
    });
});






//session login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//middleware
app.use(session({ secret: 'secret_code', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/fail'
}), function (request, response) {
  //go main if succeed
  response.redirect('/')
});






//multer -voice recordings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './recordings') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.wav')
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('audio'), (req, res) => {
  res.json({ message: 'File uploaded successfully.', redirect: '/list' });
});










// add - send write form to DB
app.post('/add', async function (request, response) {
  try {
    console.log(request.body)
    // Fetch the counter document
    const counter = await Counter.findOne({ name: 'totalPostJournal' });

    // Increment the totalPost value and save the updated counter document
    counter.totalPost++;
    await counter.save();

    // Create a new post document
    const newPost = new Post({
      title: request.body.title,
      date: request.body.date
    });

    // Save the new post document
    await newPost.save();


    response.redirect('/list')
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});


// Route to render the posts
app.get('/list', (req, res) => {
  Post.find().sort({ date: -1 }).exec()
    .then(posts => {
      res.render('list', { posts: posts });
    })
    .catch(err => {
      console.error("Error fetching posts:", err);
      res.status(500).send("Error fetching posts");
    });
});
