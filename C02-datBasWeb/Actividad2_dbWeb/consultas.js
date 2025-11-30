use videojuegos_db;

// 1. Juegos con Metacritic ≥ 85
db.games.find({metacritic: {$gte: 85}}, {name:1, metacritic:1, _id:0}).pretty();

// 1. Juegos con Metacritic ≥ 85
db.games.find({metacritic: {$gte: 85}}, {name:1, metacritic:1, _id:0}).pretty();

// 2. Top 5 mejor valorados por usuarios
db.games.find().sort({rating: -1}).limit(5).pretty();

// 3. Solo nombre y fecha, orden descendente
db.games.find({}, {name:1, released:1, _id:0}).sort({released: -1}).pretty();

// 4. Juego con menor rating
db.games.find().sort({rating: 1}).limit(1).pretty();

// 5. Ejemplo de actualización
db.games.updateOne({slug: "black-myth-wukong"}, {$set: {precio: 59.99, en_oferta: false}});