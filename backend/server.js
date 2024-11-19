const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path")
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
    raceId: { type: Number, required: true }, 
    raceName: String,
    user: String,
    type: String, 
    message: String,
  }, { collection: 'posts' , timestamps: true});
  

const raceSchema = new mongoose.Schema({
  raceId: { type: Number, required: true }, 
  name : String,
  location : String
}, { collection: 'races' })

const replySchema = new mongoose.Schema({
  postId: { type: String, required: true },
  user: String,
  message: String
}, {collection : 'replies' , timestamps: true});


const Post = mongoose.model('Post', postSchema);
const Race = mongoose.model('Race', raceSchema);
const Reply = mongoose.model('Reply', replySchema);

module.exports = { Post, Race, Reply };


app.get('/', (req, res) => {
  res.send('Bib Transfer API Running');
});


app.get('/chat/:raceId/thread/:postId', async (req, res) => {
  const { raceId, postId } = req.params; 
  
  try {
    const post = await Post.findOne({ _id: postId, raceId: raceId }); 
    if (!post) {
      return res.status(404).json({ message: 'Post not found or does not belong to this race' });
    }
    const replies = await Reply.find({ postId: post._id }); 
    res.json({ post, replies }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post or replies', error });
  }
});



app.get('/races', async (req, res) => {
  try {
    
    const races = await Race.find();
    res.json(races);
    
  } catch (err) {
    
    res.status(500).json({ message: 'Error fetching races', error: err });
  }
});

app.post('/replies/:postId', async (req, res) => {
  const { postId, user, message } = req.body;
  const newReply = new Reply({ postId, user, message });

  try {
    const savedPost = await newReply.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error saving reply" });
  }
});

app.get('/chat/:raceId', async (req, res) => {
    const { raceId } = req.params;
  
    try {
      const posts = await Post.find({ raceId: raceId });
      res.json(posts);  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to fetch posts" });
    }
  });

  app.get('/replies/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      const replies = await Reply.find({ postId: postId });
      res.json(replies);  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to fetch replies" });
    }
  });
  
app.post("/posts", async (req, res) => {
    const { raceId, type, message, user } = req.body;
    const newPost = new Post({ raceId, type, message, user });
  
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: "Error saving post" });
    }
});

app.get('/races/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const race = await Race.findOne({ raceId: Number(id) }); 
    if (race) {
      res.json(race);
    } else {
      res.status(404).json({ error: "Race not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
