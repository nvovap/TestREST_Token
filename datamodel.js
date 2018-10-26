
const Sequelize = require('sequelize');
const crypto = require('crypto');



//const sequelize = new Sequelize('map_new_york', 'postgres', '123', {
const sequelize = new Sequelize('portfolio', process.env.USERPOSTGRES || 'user', process.env.PSWPOSTGRES || '123', {
  host: process.env.HOSTPOSTGRES || 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  port: process.env.PORTPOSTGRES || 5432

});


const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});




const Items = sequelize.define('items', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.INTEGER
  }
});


exports.findAllItemsByTitleAndUser_id = function (title, user_id, order_by, callback) {
  Items.findAll({
    where: {
      title: title,
      user_id: user_id
    },
    order: order_by
  }).then(items => {
      callback(items);
  });
};

exports.findAllItemsByTitle = function (title,  order_by, callback) {
  Items.findAll({
    where: {
      title: title
    },
    order: order_by
  }).then(items => {
      callback(items);
  });
};


exports.findAllItemsByUser_id = function (user_id, order_by, callback) {
  Items.findAll({
    where: {
      user_id: user_id
    },
    order: order_by
  }).then(items => {
      callback(items);
  });
};


exports.findAllItems = function (order_by, callback) {
  Items.findAll({
    order: order_by
  }).then(items => {
      callback(items);
  });
};


exports.createItem = function (token, title, description, image, callback) {
    
    User.findOne({
      where: {
        token: token
      }
    }).then(user => {
      if (user) {
         Items.sync({force: false}).then(() => {
          Items.create({
            title: title,
            description: description,
            image: "",
            user_id: user.id
          }).then((item)=>{
            callback(user, item)
          });
        });
      } else {
        callback(user, item, 404);
      }
    });
};


exports.findItemById = function (id, callback) {
  Items.findOne({
        where: {
        id: id
      }
  }).then(item => {
      callback(item);
  });
};




exports.connnectToDatabase = function () {
	sequelize
  		.authenticate()
  		.then(() => {
   				console.log('Connection has been established successfully.');
  		})
  		.catch(err => {
    		console.error('Unable to connect to the database:', err);
  	});
};


exports.findAllUsersByNameAndMail = function (name, email, callback) {
  User.findAll({
        where: {
        name: name,
        email: email
      }
  }).then(users => {
      callback(users);
  });
};

exports.findAllUsersByName = function (name, callback) {
  User.findAll({
        where: {
        name: name
      }
  }).then(users => {
      callback(users);
  });
};

exports.findAllUsersByMail = function (email, callback) {
  User.findAll({
        where: {
        email: email
      }
  }).then(users => {
      callback(users);
  });
};

exports.findAllUser = function (callback) {
  User.findAll().then(users => {
      callback(users);
  });
};

exports.findUser = function (email, password, callback) {
	User.findOne({
  			where: {
    		email: email
  		}
	}).then(user => {
		var err = null;
		if (user == null) {
			err = 'email'
		} else { //checkPassword

       var hashpasswordNew = crypto.createHash('sha512')
                   .update(user.salt + password, 'utf8')
                   .digest('hex');


			if (user.password != hashpasswordNew) {
				err = 'password'
			}
		}

    var token = null;

    if (user) {
      token = user.token; 
    }

  	callback(token, err);
	});
};


exports.findUserByToken = function (token, callback) {
	User.findOne({
  			where: {
    		token: token
  		}
	}).then(user => {
  		callback(user);
	});
};


exports.findUserById = function (id, callback) {
  User.findOne({
        where: {
        id: id
      }
  }).then(user => {
      callback(user);
  });
};


exports.createUser = function (name, email, password, phone, callback) {

  if (password === "") {
    err =  {field: 'current_password', message: "Wrong current password"}
    callback(null, err);
  } else {

    const token = Math.round((Date.now() * Math.random())) + '';

    var salt = Math.round((Date.now() * Math.random())) + '';
    var hashpassword = crypto.createHash('sha512')
                   .update(salt + password, 'utf8')
                   .digest('hex');

    User.findOne({
        where: {
        email: email
      }
    }).then(user => {
      if (user == null) {

          User.sync({force: false}).then(() => {
            User.create({
              name: name,
              email: email,
              password: hashpassword,
              salt: salt,
              token: token,
              phone: phone
            }).then(()=>{callback(token)});
          });
     

      } else {
        err =  {field: 'email exists', message: "Wrong email"}
        callback(null, err);
      }

    }).catch(() => {
      User.sync({force: false}).then(() => {
        User.create({
          name: name,
          email: email,
          password: hashpassword,
          salt: salt,
          token: token,
          phone: phone
        }).then(()=>{callback(token)});
      });
    });
  }

};



exports.updateUser = function (token, name, email, password, phone, callback) {


  User.findOne({
        where: {
        token: token
      }
  }).then(user => {
    if (user) {
     
      if (name != '')     user.name      = name;
      if (email != '')    user.email     = email;
      user.password  = password;
      if (phone != '')    user.phone     = phone;

      user.save();

      callback(user);

    } else {
        err = "token don't exists";
        callback(null, err);
    }

  });


};







