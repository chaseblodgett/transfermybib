const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
    raceId: { type: Number, required: true }, 
    raceName : String,
    user: String,
    type: String, 
    message: String,
  });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;

app.get('/', (req, res) => {
  res.send('Bib Transfer API Running');
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



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
