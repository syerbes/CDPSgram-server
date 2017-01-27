var fs = require('fs');
var Fotos = require('./../models/photo');

// Devuelve una lista de las imagenes disponibles y sus metadatos
exports.list = function (req, res) {
	Fotos.find(function(err,fotos){
                console.log(fotos)
		if(err){
			return console.error(err);
		} else{
			res.render('photos/index', {photos: fotos});
		}
	});
};

// Devuelve la vista del formulario para subir una nueva foto
exports.new = function (req, res) {
	res.render('photos/new');
};

// Devuelve la vista de visualización de una foto.
// El campo photo.url contiene la url donde se encuentra el fichero de audio
exports.show = function (req, res) {
	Fotos.where({name: req.params.photoId}).findOne(function(err, foto) {
		console.log(foto);
		if(err){
			return console.error(err);
		} else{
			res.render('photos/show', {photo: foto});
		}
	});
};

// Escribe una nueva foto en el registro de imagenes.
exports.create = function (req, res) {
	var name = req.body.photo;
	Fotos.where({name: name}).findOne(function(err, foto) {
		if(err){
			return console.error(err);
		} else{
			if(foto != null){
			} else{
				var newFoto = new Fotos({
					name : name,
					url : req.body.url,
				});
				newFoto.save(function (err, newFoto) {
  				if (err)
 					 console.log('Error al guardar la foto');	
				});
			}
		}
	});
	res.redirect('/photos');
};

// Borra una foto (photoId) del registro de imagenes 
exports.destroy = function (req, res) {
	console.log(req.params.photoId);
	Fotos.where({name: req.params.photoId}).findOne(function(err, foto) {
		console.log(foto);
	  	 if (err){
			 return console.error(err);
		} else{
  			foto.remove(function(err) {
    			      if (!err) console.log('Foto borrada');
    			      else console.log( err);
      		        });
		}
	});

	res.redirect('/photos');
};
