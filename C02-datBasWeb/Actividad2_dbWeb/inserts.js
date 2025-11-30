use videojuegos_db;

// Limpiamos por si ya existían
db.games.deleteMany({});

// Insertamos los 10 videojuegos
db.games.insertMany(
[
  {
    "name": "Black Myth: Wukong",
    "released": "2024-08-20",
    "rating": 4.5,
    "rating_count": 12500,
    "metacritic": 81,
    "genres": [
      "Action",
      "Role-playing (RPG)"
    ],
    "platforms": [
      "PC",
      "PlayStation 5"
    ],
    "stores": [
      "Steam",
      "PlayStation Store"
    ],
    "tags": [
      "Souls-like",
      "Singleplayer",
      "Open World"
    ],
    "slug": "black-myth-wukong",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef631d"
    }
  },
  {
    "name": "Star Wars Outlaws",
    "released": "2024-08-30",
    "rating": 3.8,
    "rating_count": 8500,
    "metacritic": 74,
    "genres": [
      "Action",
      "Adventure"
    ],
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series S/X"
    ],
    "stores": [
      "Steam",
      "Ubisoft Connect"
    ],
    "tags": [
      "Open World",
      "Singleplayer",
      "Third Person"
    ],
    "slug": "star-wars-outlaws",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef631e"
    }
  },
  {
    "name": "Dragon's Dogma 2",
    "released": "2024-03-22",
    "rating": 4.2,
    "rating_count": 21000,
    "metacritic": 87,
    "genres": [
      "Role-playing (RPG)",
      "Action"
    ],
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series S/X"
    ],
    "stores": [
      "Steam"
    ],
    "tags": [
      "Open World",
      "Action RPG",
      "Fantasy"
    ],
    "slug": "dragons-dogma-2",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef631f"
    }
  },
  {
    "name": "Stellar Blade",
    "released": "2024-04-26",
    "rating": 4.1,
    "rating_count": 6800,
    "metacritic": 82,
    "genres": [
      "Action"
    ],
    "platforms": [
      "PlayStation 5"
    ],
    "stores": [
      "PlayStation Store"
    ],
    "tags": [
      "Hack and Slash",
      "Singleplayer",
      "Sci-fi"
    ],
    "slug": "stellar-blade",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6320"
    }
  },
  {
    "name": "Hades II",
    "released": "2024-05-06",
    "rating": 4.7,
    "rating_count": 4500,
    "metacritic": null,
    "genres": [
      "Action",
      "Roguelike"
    ],
    "platforms": [
      "PC"
    ],
    "stores": [
      "Steam"
    ],
    "tags": [
      "Roguelite",
      "Mythology",
      "Action Roguelike"
    ],
    "slug": "hades-ii",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6321"
    }
  },
  {
    "name": "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
    "released": "2024-11-20",
    "rating": 4.3,
    "rating_count": 3200,
    "metacritic": 79,
    "genres": [
      "Action",
      "Shooter"
    ],
    "platforms": [
      "PC",
      "Xbox Series S/X"
    ],
    "stores": [
      "Steam",
      "Xbox Store"
    ],
    "tags": [
      "FPS",
      "Open World",
      "Post-apocalyptic"
    ],
    "slug": "stalker-2-heart-of-chornobyl",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6322"
    }
  },
  {
    "name": "Indiana Jones and the Great Circle",
    "released": "2024-12-09",
    "rating": 4.0,
    "rating_count": 1200,
    "metacritic": 85,
    "genres": [
      "Action",
      "Adventure"
    ],
    "platforms": [
      "PC",
      "Xbox Series S/X"
    ],
    "stores": [
      "Steam",
      "Xbox Store"
    ],
    "tags": [
      "First-Person",
      "Puzzle",
      "Adventure"
    ],
    "slug": "indiana-jones-and-the-great-circle",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6323"
    }
  },
  {
    "name": "Silent Hill 2 Remake",
    "released": "2024-10-08",
    "rating": 4.6,
    "rating_count": 8900,
    "metacritic": 87,
    "genres": [
      "Adventure",
      "Survival Horror"
    ],
    "platforms": [
      "PC",
      "PlayStation 5"
    ],
    "stores": [
      "Steam",
      "PlayStation Store"
    ],
    "tags": [
      "Horror",
      "Psychological Horror",
      "Remake"
    ],
    "slug": "silent-hill-2-remake",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6324"
    }
  },
  {
    "name": "Final Fantasy VII Rebirth",
    "released": "2024-02-29",
    "rating": 4.4,
    "rating_count": 15600,
    "metacritic": 92,
    "genres": [
      "Role-playing (RPG)",
      "Action"
    ],
    "platforms": [
      "PlayStation 5"
    ],
    "stores": [
      "PlayStation Store"
    ],
    "tags": [
      "JRPG",
      "Action RPG",
      "Turn-based Combat"
    ],
    "slug": "final-fantasy-vii-rebirth",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6325"
    }
  },
  {
    "name": "Like a Dragon: Infinite Wealth",
    "released": "2024-01-26",
    "rating": 4.3,
    "rating_count": 7400,
    "metacritic": 89,
    "genres": [
      "Role-playing (RPG)",
      "Action"
    ],
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series S/X"
    ],
    "stores": [
      "Steam"
    ],
    "tags": [
      "Turn-based RPG",
      "Comedy",
      "Crime"
    ],
    "slug": "like-a-dragon-infinite-wealth",
    "_id": {
      "$oid": "692c3ed4b5a5876c47ef6326"
    }
  }
]
);
