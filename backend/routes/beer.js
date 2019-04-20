const express = require('express');
const authCheck = require('../config/auth-check');
const Beer = require('../models/Beer');

const router = new express.Router();

function validateBeerCreateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  payload.price = parseFloat(payload.price);

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false;
    errors.name = 'Beer name must be at least 3 symbols.';
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false;
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.';
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false;
    errors.price = 'Price must be a positive number.';
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
    isFormValid = false;
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/create', authCheck, (req, res) => {
  const BeerObj = req.body;
  if (req.user.roles.indexOf('admin') > -1) {
    const validationResult = validateBeerCreateForm(BeerObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Beer
      .create(BeerObj)
      .then((createdBeer) => {
        res.status(200).json({
          success: true,
          message: 'Beer added successfully.',
          data: createdBeer
        });
      })
      .catch((err) => {
        console.log(err);
        let message = 'Something went wrong :( Check the form for errors.';
        if (err.code === 11000) {
          message = 'Beer with the given name already exists.';
        }
        return res.status(200).json({
          success: false,
          message: message
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    });
  }
});

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('admin') > -1) {
    const BeerId = req.params.id;
    const BeerObj = req.body;
    const validationResult = validateBeerCreateForm(BeerObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Beer
      .findById(BeerId)
      .then(existingBeer => {
        existingBeer.title = BeerObj.title;
        existingBeer.author = BeerObj.author;
        existingBeer.genres = BeerObj.genres;
        existingBeer.description = BeerObj.description;
        existingBeer.price = BeerObj.price;
        existingBeer.image = BeerObj.image;

        existingBeer
          .save()
          .then(editedBeer => {
            res.status(200).json({
              success: true,
              message: 'Beer edited successfully.',
              data: editedBeer
            });
          })
          .catch((err) => {
            console.log(err);
            let message = 'Something went wrong :( Check the form for errors.';
            if (err.code === 11000) {
              message = 'Beer with the given name already exists.';
            }
            return res.status(200).json({
              success: false,
              message: message
            });
          });
      })
      .catch((err) => {
        console.log(err);
        const message = 'Something went wrong :( Check the form for errors.';
        return res.status(200).json({
          success: false,
          message: message
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    });
  }
});

router.get('/all', (req, res) => {
  Beer
    .find()
    .then(Beers => {
      res.status(200).json(Beers);
    });
});

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const review = req.body.review;
  const username = req.user.username;

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.';
    return res.status(200).json({
      success: false,
      message: message
    });
  }

  Beer
    .findById(id)
    .then(Beer => {
      if (!Beer) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        });
      }

      let reviewObj = {
        review,
        createdBy: username
      };

      let reviews = Beer.reviews;
      reviews.push(reviewObj);
      Beer.reviews = reviews;
      Beer
        .save()
        .then((Beer) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: Beer
          });
        })
        .catch((err) => {
          console.log(err);
          const message = 'Something went wrong :( Check the form for errors.';
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :( Check the form for errors.';
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.get('/details/:id', (req,res) => {
  const id = req.params.id;

  Beer
    .findById(id)
    .then(beer => {
      if(!beer) {
        const message = 'Product not found!';
        return res.status(200).json({
          success: false,
          message
        });
      }

      res.status(200).json(beer);
    });
});

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  Beer
    .findById(id)
    .then(Beer => {
      if (!Beer) {
        const message = 'Product not found.';
        return res.status(200).json({
          success: false,
          message: message
        });
      }

      let likes = Beer.likes;
      if (!likes.includes(username)) {
        likes.push(username);
      }
      Beer.likes = likes;
      Beer
        .save()
        .then((Beer) => {
          res.status(200).json({
            success: true,
            message: 'Beer liked successfully.',
            data: Beer
          });
        })
        .catch((err) => {
          console.log(err);
          const message = 'Something went wrong :(';
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :(';
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  Beer
    .findById(id)
    .then(Beer => {
      if (!Beer) {
        let message = 'Product not found.';
        return res.status(200).json({
          success: false,
          message: message
        });
      }

      let likes = Beer.likes;
      if (likes.includes(username)) {
        const index = likes.indexOf(username);
        likes.splice(index, 1);
      }

      Beer.likes = likes;
      Beer
        .save()
        .then((Beer) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: Beer
          });
        })
        .catch((err) => {
          console.log(err);
          const message = 'Something went wrong :(';
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :(';
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id;
  if (req.user.roles.indexOf('Admin') > -1) {
    Beer
      .findById(id)
      .then((Beer) => {
        Beer
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Beer deleted successfully!'
            });
          });
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    });
  }
});

module.exports = router;
