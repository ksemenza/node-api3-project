const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "The posts' information could not be retrieved." ,
      error: err});
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.body.id;
  postDb.getById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: `The post with id ${id}'s information could not be retrieved.` ,
      error: err});
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  postDb.remove(id)
    .then(response => {
      if (response === 1) {
        res.status(202).json({"NumberPostsDeleted: ": response});
      } else {
        res.status(500).json({error: `Unable to remove post with id of ${id}`});
      }
    })
    .catch(err => {
      res.status(500).json({message: `Unable to remove post with id of ${id}`,
      error: err});
    });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  if (!req.body.text) {
    res.status(400).json({ message: 'Please provide updated text for the post' });
  }
  if (!req.body.user_id) {
    res.status(400).json({ message: 'Please provide user_id for the updated post' });
  }
  postDb.update(id, {"text" : req.body.text, "user_id" : req.body.user_id})
    .then(response => {
      if (response === 1) {
        postDb.getById(id) 
          .then(response => {
            res.status(201).json(response);
          })
          .catch(err => {
            res.status(404).json({message: `Unable to retrieve post of id ${id}.`});
          });
      } else {
        res.status(500).json({ error:`Unable to update post of id ${id}.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message:`Unable to update post of id ${id}.`, 
      error: err });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.params.id)
    .then(response => {
        req.postId = response.data;
        next();
    })
    .catch(err => {
      res.status(400).json({message: "invalid post id"})
    });
}

module.exports = router;
