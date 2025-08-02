const router = require('express').Router();

router.get('/menu', (req, res) => {
    res.json([
        { id: 1, name: 'Burger', price: 8.99 },
        { id: 2, name: 'Pizza', price: 12.99 },
        { id: 3, name: 'Fries', price: 6.99 },
        { id: 4, name: 'Noodles', price: 16.49 },
        { id: 5, name: 'Momo', price: 26.19 },
        { id: 6, name: 'Fried Rice', price: 12.39 },
    ]);
})

module.exports = router;