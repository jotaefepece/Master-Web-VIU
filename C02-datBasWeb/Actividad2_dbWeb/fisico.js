// fisico.js
use videojuegos_db;

db.createCollection("games", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Videojuego 2024-2025",
      required: ["name", "released", "rating", "rating_count", "genres", "platforms", "stores", "tags", "slug"],
      additionalProperties: true,
      properties: {
        _id: { bsonType: "objectId" },
        name: { bsonType: "string", minLength: 1 },
        released: { bsonType: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
        rating: { bsonType: "double", minimum: 0, maximum: 5 },
        rating_count: { bsonType: "int", minimum: 0 },
        metacritic: { bsonType: ["int", "null"], minimum: 1, maximum: 100 },
        genres: { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
        platforms: { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
        stores: { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        slug: { bsonType: "string" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// Índices útiles
db.games.createIndex({ rating: -1 });
db.games.createIndex({ metacritic: -1 });
db.games.createIndex({ released: -1 });
db.games.createIndex({ genres: 1 });
db.games.createIndex({ platforms: 1 });
db.games.createIndex({ slug: 1 }, { unique: true });

print("Colección 'games' creada con esquema y índices");
