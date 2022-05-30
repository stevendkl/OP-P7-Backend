// Import sequelize
const {Sequelize, sequelize} = require('../config/config');

// Set user model
const Sauce = sequelize.define('sauce', {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },   
  userId: {type: Sequelize.STRING},
  name: {type: Sequelize.STRING, allowNull: false},
  manufacturer: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.STRING(12000), allowNull: false},
  mainPepper: {type: Sequelize.STRING, allowNull: false, defaultValue: "mild"},
  imageUrl: {type: Sequelize.STRING},
  heat: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  likes: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  dislikes: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  usersLiked: {type: Sequelize.STRING, defaultValue: ""},
  usersDislikeds: {type: Sequelize.STRING, defaultValue: ""}
});

Sauce.sync().then(() => {
  console.log('success sync mysql sauce table!') 
});

module.exports = Sauce;
