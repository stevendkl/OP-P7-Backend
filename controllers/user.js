const bcrypt = require('bcrypt');
const User = require('../models/user');
const Postread = require('../models/postread');
const jwt = require('jsonwebtoken');

// setup signup function
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({          
          email: req.body.email,
          username: req.body.username,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(206).json({
              error: 'User already exist!'
            });
          }
        );
      }
    );
  };

// setup delete account function
exports.delete = (req, res, next) => {
  User.destroy({
    where: {id: req.body.userId}
  })
  .then(() => {
    Postread.destroy({
    where: {userId: req.body.userId}
  })
  })
  .then(() => {
    res.status(200).json({
      message: 'User deleted successfully!'
    });
  }).catch(
    (error) => {      
      res.status(206).json({
        error: "delete error!"
      });
    }
  );
};

// setup login function
exports.login = (req, res, next) => {
    User.findOne({where:{email: req.body.email}}).then(
      (user) => {
        if (!user) {
          return res.status(206).json({
            error: 'User not found!'
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(206).json({
                error: 'Incorrect password!'
              });
            }
            const token = jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user.id,
              username: user.username,
              token: token,
              email: user.email,
              registerdate: user.createdAt,             
            });            
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
}