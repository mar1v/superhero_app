const mongoose = require("mongoose");
const Superhero = require("./models/Superhero");
require("dotenv").config();

const heroes = [
  {
    "nickname": "Superman",
    "real_name": "Clark Kent",
    "origin_description": "Born Kal-El on Krypton, rocketed to Earth as an infant...",
    "superpowers": ["Solar energy absorption", "Super strength", "Flight", "Invulnerability"],
    "catch_phrase": "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    "images": ["https://www.superherodb.com/pictures2/portraits/10/100/791.jpg"]
  },
  {
    "nickname": "Batman",
    "real_name": "Bruce Wayne",
    "origin_description": "After witnessing the murder of his parents...",
    "superpowers": ["Genius intellect", "Martial arts mastery", "Stealth", "High-tech gadgets"],
    "catch_phrase": "I am Batman.",
    "images": ["https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"]
  },
  {
    "nickname": "Wonder Woman",
    "real_name": "Diana Prince",
    "origin_description": "Amazonian princess gifted with powers by the Greek gods...",
    "superpowers": ["Super strength", "Agility", "Immortality", "Lasso of Truth"],
    "catch_phrase": "In the name of all that is good...",
     "images": ["https://www.superherodb.com/pictures2/portraits/10/100/807.jpg"]
  },
  {
    "nickname": "Spider-Man",
    "real_name": "Peter Parker",
    "origin_description": "Bitten by a radioactive spider, gained arachnid-like abilities...",
    "superpowers": ["Wall-crawling", "Spider-sense", "Superhuman reflexes", "Web-shooting"],
    "catch_phrase": "With great power comes great responsibility!",
    "images": ["https://www.superherodb.com/pictures2/portraits/10/100/133.jpg"]
  },
  {
    "nickname": "Iron Man",
    "real_name": "Tony Stark",
    "origin_description": "Billionaire genius who built a high-tech armored suit...",
    "superpowers": ["Powered armor suit", "Flight", "Advanced weapons", "Genius inventor"],
    "catch_phrase": "I am Iron Man.",
    "images": ["https://www.superherodb.com/pictures2/portraits/10/100/85.jpg"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    
    console.log("✅ Connected to MongoDB Atlas");

    await Superhero.deleteMany({});
    console.log("🗑️ Cleared existing superheroes");

    await Superhero.insertMany(heroes);
    console.log("✅ Database seeded with superheroes!");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    throw error;
  } finally {

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
  }
};


seedDB().catch((error) => {
  console.error("❌ Seeding failed:", error.message);
  process.exit(1);
});