const Sauce = require('../models/sauce');
const fs = require('fs');

// setup sauce create function
exports.createSauce = (req, res, next) => {
  const sauceObject = req.body;
  //const sauceObject = JSON.parse(req.body.sauce);
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    imageUrl = null;
  }
  //const url = req.protocol + '://' + req.get('host'); 
  const sauce = Sauce.create({
    ...sauceObject,
    imageUrl: imageUrl,
  });  
  //console.log(JSON.parse(req.body.sauce));
  sauce.then(
    () => {
      res.status(201).json({
        message: 'Posted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(206).json({
        error: 'Post failed'
      });
    }
  );
};

// setup sauce get function
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    where: {
      _id: req.params.id
    }
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
      //今日进度
      //console.log(sauce);
      //console.log(sauce.name);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// setup sauce update function
exports.modifySauce = (req, res, next) => {
  if (req.file) {
    console.log("update all");
    const url = req.protocol + '://' + req.get('host');
    Sauce.findOne({
      where: {
        _id: req.params.id
      }})
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: url + '/images/' + req.file.filename,
          };
          Sauce.update({ ...sauceObject, _id: req.params.id }, 
          { where: 
            {_id: req.params.id}
          })          
            .then(() => res.status(200).json({ message: "Sauce updated successfully!" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    // No new file upload, only update text
    console.log("updata text");
    const sauceObject = { ...req.body };
    Sauce.update({ ...sauceObject, _id: req.params.id }, 
      { where: 
        {_id: req.params.id}
      }) 
      .then(() => res.status(200).json({ message: "Sauce updated successfully!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// setup sauce delete function
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
    where: {
      _id: req.params.id
    }
  }).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.destroy({
          where: {
            _id: req.params.id
          }
        }).then(
          () => {
            res.status(200).json({
              message: 'Sauce deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(206).json({
              error: 'process error'
            });
          }
        );
      });
    }
  );
};

// setup function of get all sauce from database
exports.getAllSauce = (req, res, next) => {
  Sauce.findAll().then(
    (sauces) => {
      res.status(200).json(sauces);
      //console.log(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};




