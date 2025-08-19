const router = require('express').Router();

router.get('/menu', (req, res) => {
    res.json([
        { id: 1, name: 'Burger', price: 8.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHp64n-eLrDSrY29_HCRIuP7-p89ndb18ezw&s' },
        { id: 2, name: 'Pizza', price: 12.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxKRzb98k-hNThaEfqVkSxXpCGPyGoGeE8A&s' },
        { id: 3, name: 'Fries', price: 6.99, image: 'https://sausagemaker.com/wp-content/uploads/Homemade-French-Fries_8.jpg' },
        { id: 4, name: 'Noodles', price: 16.49, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDz4-GZI5EPxY_2Q-d_HnCANSJ42Cf6EFWg&s' },
        { id: 5, name: 'Momo', price: 26.19, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJo0RNeX_bMirOJW57pF62n23ciRRe7Jwlg&s' },
        { id: 6, name: 'Fried Rice', price: 12.39, image: 'https://fullofplants.com/wp-content/uploads/2020/05/sweet-and-sour-spicy-thai-fried-rice-easy-vegan-meal-with-vegetables-thumb.jpg' },
    ]);
})

module.exports = router;