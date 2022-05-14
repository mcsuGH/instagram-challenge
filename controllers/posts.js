const { Schema } = require("mongoose");
const { post } = require("../app");
const Post = require("../models/post");
const mongoose = require('mongoose');

const PostsController = {
  Index: (req, res) => {
    Post.find().populate({path: "user", select: "email"}).exec((err, posts) => {
      if (err) {
        throw err;
      }
      let reverse = posts.reverse()
      res.render("posts/index", { 
        posts: reverse, 
        user: req.session.user 
      });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { user: req.session.user });
  },
  Create: (req, res) => {
    var postInfo = {
      url: req.body.url,
      caption: req.body.caption,
      user: req.session.user._id
    }
    const post = new Post(postInfo);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  }, 
  PostInfo: (req, res) => {
    Post.findById(req.params.id).populate({path: "user", select: "email"}).exec((err, post) => {
      if (err) res.json(err);
      else res.render("posts/id", { post: post, user: req.session.user })
    })
  },
  Likes: (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, {$inc : {'likes' : 1}}).exec((err, post) => {
      if (err) res.json(err);
      else res.status(201).redirect(`/posts/${req.params.id}`);
    })
  },
  Delete: (req, res) => {
    Post.findByIdAndRemove(req.params.id, 
      function(err, docs) {
        if(err) res.json(err);
        else res.status(201).redirect("/posts");
      })
  }
}  

module.exports = PostsController;
