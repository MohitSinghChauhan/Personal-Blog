const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { append } = require("express/lib/response");

const app = express();
app.use(express.static('public'));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('home', { home: homeStartingContent, posts: posts });
})

app.get('/about', (req, res) => {
  res.render('about', { aboutContent: aboutContent });
})

app.get('/contact', (req, res) => {
  res.render('contact', { contactContent: contactContent });
})

app.get('/compose', (req, res) => {
  res.render('compose');
})

// app.get('/:param',(req,res)=>{
//   console.log(req.params.param);
//   res.redirect('/');
// })

app.post('/compose', (req, res) => {
  const newPost = req.body;
  let { postTitle, postContent } = newPost;
  posts.push(newPost);
  res.redirect('/');
})

app.get('/posts/:postSearch', (req, res) => {
  let postSearch = req.params.postSearch;
  
  posts.forEach((post) => {

    if (_.lowerCase(post.postTitle) == _.lowerCase(postSearch)) {
      res.render('post', {post:post});
    }else{
      res.render('error');
    }
  })

  res.redirect('/');
})


app.get('/:searchTerm', (req, res) => {
  let searchTerm = req.params.searchTerm;

    if ("posts" == _.lowerCase(searchTerm)) {
      res.redirect('/');
    }else{
      res.render('error');
    }
 
  res.redirect('/');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Started at Port " + PORT));