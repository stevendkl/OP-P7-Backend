// Import sequelize
const {Sequelize, sequelize} = require('../config/config');
const Postread = require('../models/postread');
const Sauce = require('../models/sauce');

// setup read record create function
exports.createRead = (req, res, next) => {
  const postread = new Postread({          
    postId: req.body.postId,
    userId: req.body.userId,
  });  
  //console.log(JSON.parse(req.body.sauce));
  postread.save().then(
    () => {
      res.status(201).json({
        message: 'Post read status saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(206).json({
        error: 'Post already read!'
      });
    }
  );
};

// setup function of get all read status list
exports.getAllRead = (req, res, next) => {
  Postread.findAll().then(
    (postreads) => {
      res.status(200).json(postreads);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// setup function of get all unread posts
exports.getUnRead = async (req, res, next) => {  
  try { const postunread = await sequelize.query('SELECT * FROM sauces WHERE _Id NOT IN (SELECT postId FROM postreads WHERE userId = :status) AND userId NOT IN (:status)', 
  { replacements: { status: req.params.id },
    model: Sauce,
    mapToModel: true });
  res.status(200).json(postunread);
  }
  catch (error) {
    return res.status(400).json({
      error: error
    });
  }
};



/*Postread.hasOne(Sauce, {
  foreignKey: '_id',
  sourceKey: 'postId'
});*/

// setup function of get all read posts
/*exports.getRead = (req, res, next) => {
  Postread.findAll({
    where: {
      userId: req.params.id
    },
     include: {
      model: Sauce
     }
 }).then(
    (postreads) => {
      res.status(200).json(postreads);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};*/



