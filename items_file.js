var datamodel = require('./datamodel');
var fs = require('fs-extra')
const MAX_SIZE_FILE = process.env.MAX_SIZE_FILE || 800000;


//const hostname = "" + (process.env.HOSTNAME || "localhost") + ":" +  (process.env.PORT || 3000)

const hostname = "" + (process.env.HOSTNAME || "localhost") + ":" +  (process.env.PORT || 3000)

function getPathImage(imagename) {
  if(imagename == '') {
    return '';
  }  
  else {  
    return hostname + imagename;
  }
}


exports.createItem = function(req,res){
  var title    = "";
  var description  = ""; 
  

  req.pipe(req.busboy);

  req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    
    console.log('Field ON');

    val  = val.replace( "\r\n", "" );
    
    if (fieldname == 'title') {
      title = val;
    }

    if (fieldname == 'description') {
      description = val;
    }


  });

  req.busboy.on('finish', function() {

    if (title == '') {
      res.status(422).json({"field":"title","message":"Title is required"}); 
    } else if (description == '') {
      res.status(422).json({"field":"description","message":"Description is required"}); 
    } else {
      datamodel.createItem(req.headers.authorization, title, description, "", (user, item, err) => {
        if (err) {
          res.status(err).send(''); 
        } else {
          res.json({"id": item.id, "image": item.image, "created_at": item.createdAt, "title": item.title, "description": item.description, "user_id": item.user_id, "user": {"id": user.id, "phone":  user.phone, "name":  user.name, "email":  user.email  }}); 
        }
      })
    }
  });

}


exports.updateItem = function(req,res){
  var title    = "";
  var description  = ""; 
  

  req.pipe(req.busboy);

  req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    
    console.log('Field ON');

    val  = val.replace( "\r\n", "" );
    
    if (fieldname == 'title') {
      title = val;
    }

    if (fieldname == 'description') {
      description = val;
    }


  });

  req.busboy.on('finish', function() {

      if (title.length > 3) {
        datamodel.findItemById(req.params.id, (item) => {

          if (item) {
            item.title = title;
            item.description = description;
            item.save();

            datamodel.findUserById(item.user_id, (user) => {
              if (user) {
                res.json({"id": item.id, "image": getPathImage(item.image), "created_at": item.createdAt, "title": item.title, "description": item.description, "user_id": item.user_id, "user": {"id": user.id, "phone":  user.phone, "name":  user.name, "email":  user.email  }});
              } else {
                res.status(404).send(''); 
              }
            }) 
          } else {
            res.status(404).send(''); 
          }

        })
      } else {
        res.status(422).json({"field":"title","message":"Title should contain at least 3 characters" });
      }
    });
}




exports.uploadItemImage = function(req, res){

  
    req.pipe(req.busboy);


    req.busboy.on('file', function(fieldname, file, filename){
      if (parseInt(req.headers['content-length']) < MAX_SIZE_FILE) {
    
      var dir = "public/img/"+req.params.id

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      var stream = new fs.WriteStream(dir + "/" +filename);

      console.log("fieldname = "+fieldname+"; filename = "+filename);

      file.pipe(stream);

      console.log("END busboy file");

      stream.on('close', function(){
        console.log('Upload finishid ');
        //res.send('ok');

      

        fs.exists(dir + "/" +filename, function(exists){
            if (exists){
              datamodel.findItemById(req.params.id, (item) => {
                if (item) {

                  item.image =  "/img/"+req.params.id + "/" +filename;
                  item.save()

                  datamodel.findUserById(item.user_id, (user) => {
                    if (user) {
                      res.json({"id": item.id, "image": getPathImage(item.image), "created_at": item.createdAt, "title": item.title, "description": item.description, "user_id": item.user_id, "user": {"id": user.id, "phone":  user.phone, "name":  user.name, "email":  user.email  }});
                    } else {
                     res.status(404).send(''); 
                    }
                  }) 

                } else {
                  res.status(404).send('');  
                }
              })
         };
        });
      });
      } else {
        res.status(422).json({"field":"image", "message":"The file "+ filename +" is too big. " });
      }
    }); 
};

exports.deleteItemImage = function(req, res){
    var dir = "public/img/"+req.params.id

    fs.removeSync(dir);

    datamodel.findItemById(req.params.id, (item) => {
      if (item) {
        item.image =  "";
        item.save()
      } else {
        res.status(404).send('');  
      }
    });


};


exports.deleteItem = function(req, res){
    var dir = "public/img/"+req.params.id

    fs.removeSync(dir);

    datamodel.findItemById(req.params.id, (item) => {
      if (item) {
        item.destroy()
        res.status(200).send(''); 
      } else {
        res.status(404).send('');  
      }
    });


};


exports.getItems = function(req,res){

  order_type = 'ASC';

  order_by = [];

  if (req.query.order_type != '') {
    order_type = req.query.order_type 
  }

  if (req.query.order_by != '') {

    var arr = req.query.order_by.split('|');

    for (var i = 0; i < arr.length; i++) {
        console.log( 'Вам сообщение ' + arr[i] );

        order_by.push([arr[i],order_type])
    }

    //order_by = "['"+req.query.order_by.replace("|","','") + "','" + order_type + "']"
    //order_by = "['"+req.query.order_by.replace("|","','")+"']"
  }

  if (req.query.title != '' && req.query.user_id != '') {
    datamodel.findAllItemsByTitleAndUser_id(req.query.title, req.query.user_id, order_by, (items) => {

      var itemsRes = items.map(function(item) {

        item.image = getPathImage(item.image )

        return item;
      }); 

      res.send(itemsRes);
    })
  } else if (req.query.title != '') {
    datamodel.findAllItemsByTitle(req.query.title, order_by, (items) => {
      var itemsRes = items.map(function(item) {

        item.image = getPathImage(item.image )

        return item;
      }); 

      res.send(itemsRes);
    })
  } else if (req.query.user_id != '') {
    datamodel.findAllItemsByUser_id(req.query.user_id, order_by, (items) => {
      var itemsRes = items.map(function(item) {

        item.image = getPathImage(item.image )

        return item;
      }); 

      res.send(itemsRes);
    })
  } else {
    datamodel.findAllItems(order_by, (items) => {
      var itemsRes = items.map(function(item) {

        item.image = getPathImage(item.image )

        return item;
      }); 

      res.send(itemsRes);
    })
  }

}


exports.getItemByID = function(req,res){
  datamodel.findItemById(req.params.id, (item) => {
    if (item) {
      datamodel.findUserById(item.user_id, (user) => {
        if (user) {
          res.json({"id": item.id, "image": getPathImage(item.image), "created_at": item.createdAt, "title": item.title, "description": item.description, "user_id": item.user_id, "user": {"id": user.id, "phone":  user.phone, "name":  user.name, "email":  user.email  }});
        } else {
          res.status(404).send(''); 
        }
      }) 
    } else {
      res.status(404).send('');  
    }
  })
}





