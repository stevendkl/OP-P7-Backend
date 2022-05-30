// Import sequelize
const {Sequelize, sequelize} = require('../config/config');

// Set user model
const Postread = sequelize.define('postread', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },  
  postId: {
    type: Sequelize.STRING,    
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,    
    allowNull: false
  },
  readstatus: {
    type: Sequelize.INTEGER,    
    allowNull: false,
    defaultValue: 100  
  }
},{
    uniqueKeys: {
      Items_unique: {
          fields: ['postId', 'userId']
      }
    }
  }
);

Postread.sync().then(() => {
  console.log('success sync mysql read table!') 
});

module.exports = Postread;
