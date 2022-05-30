// Import sequelize
const {Sequelize, sequelize} = require('../config/config');

// Set user model
const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },  
  email: {
    type: Sequelize.STRING,    
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,    
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,    
    allowNull: false  
  }
},{
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

User.sync().then(() => {
  console.log('success sync mysql user table!') 
});

module.exports = User;
