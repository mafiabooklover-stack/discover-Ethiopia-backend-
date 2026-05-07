const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const authMiddleware = require('../middleware/auth');

// GET /api/destinations - get all destinations (public)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const destinations = await Destination.find(filter).sort({ category: 1, name: 1 });
        res.json(destinations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/destinations/featured - 1 from each category (public)
router.get('/featured', async (req, res) => {
    try {
        const [historical, natural, cultural] = await Promise.all([
            Destination.findOne({ category: 'historical' }),
            Destination.findOne({ category: 'natural' }),
            Destination.findOne({ category: 'cultural' })
        ]);
        res.json([historical, natural, cultural].filter(Boolean));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/destinations/:id - single destination (public)
router.get('/:name', async (req, res) => {
    try {
        const dest = await Destination.findOne({name:req.params.name});
        if (!dest) return res.status(404).json({ message: 'Destination not found' });
        res.json(dest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/destinations - add a new destination (protected: must be logged in)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, region, image, description, bestTime, importance, category, lat, lng, highlights, entryFee, duration } = req.body;

        if (!name || !region || !description || !bestTime || !importance || !category || !lat || !lng) {
            return res.status(400).json({ message: 'Name, region, description, bestTime, importance, category, lat, and lng are required.' });
        }

        if (!['historical', 'natural', 'cultural'].includes(category)) {
            return res.status(400).json({ message: 'Category must be historical, natural, or cultural.' });
        }

        const dest = await Destination.create({
            name,
            region,
            image: image || 'assets/Lalibela.jpg.jpg',
            description,
            bestTime,
            importance,
            category,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            highlights: highlights || [],
            entryFee: entryFee || 'Varies',
            duration: duration || '1-2 days'
        });

        res.status(201).json(dest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/destinations/:id - remove a destination (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const dest = await Destination.findByIdAndDelete(req.params.id);
        if (!dest) return res.status(404).json({ message: 'Destination not found' });
        res.json({ message: 'Destination deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
