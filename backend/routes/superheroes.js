const express = require("express");
const router = express.Router();
const Superhero = require("../models/superhero");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5; 
  
  try {
    if (req.query.limit && parseInt(req.query.limit) > 50) {
      const heroes = await Superhero.find();
      return res.json(heroes);
    }
    
    const heroes = await Superhero.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hero = await Superhero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Not found" });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const hero = new Superhero(req.body);
  try {
    const newHero = await hero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHero = await Superhero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Superhero.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
