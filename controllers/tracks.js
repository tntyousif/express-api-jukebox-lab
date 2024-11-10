// controllers/pets.js
const Track = require('../models/track.js');
const express = require('express');
const router = express.Router();


// CREATE - POST - /tracks

router.post('/', async (req, res) => {
    try {
      const createdTrack = await Track.create(req.body);
      res.status(201).json(createdTrack); // 201 Created
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - GET - /tracks
router.get('/', async (req, res) => {
    try {
        const foundTracks = await Track.find();
        res.status(201).json(foundTracks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundTrack = await Track.findById(req.params.id);
        if (!foundTrack) {
            res.status(404);
            throw new Error('Truck not found.');
        }
        res.status(200).json(foundTrack);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// UPDATE - PUT - /trucks/:id
router.put('/:id', async (req, res) => {
    try {
      const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedTrack) {
        res.status(404);
        throw new Error('Truck not found.');
      }
      res.status(200).json(updatedTrack);
    } catch (error) {
      // Add code for errors
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
});

// DELETE - DELETE - /pets/:petId
router.delete('/:id', async (req, res) => {
    try {
      const track = await Track.findByIdAndDelete(req.params.id);
      if (!track) {
        return res.status(404).json({ error: 'Track not found' });
      }
      res.status(200).json(track);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;