const express = require('express');
const router = express.Router();

router.use(express.json());

let publishers = [];

router.get('/all', (req, res) => {
    res.json(publishers);
});

router.get('/names', (req, res) => {
    const publisherNames = publishers.map(publisher => publisher.name);
    res.json(publisherNames);
});

router.get('/publishers', (req, res) => {
    const booksPerPublisher = publishers.map(publisher => ({
        name: publisher.name,
        numberOfBooks: publisher.books.length
    }));
    res.json(booksPerPublisher);
});

router.post('/add', (req, res) => {
    const newPublisher = req.body;
    publishers.push(newPublisher);
    res.send('Publisher added successfully');
});

router.put('/update/:name', (req, res) => {
    const publisherName = req.params.name;
    const updatedPublisher = req.body;

    publishers = publishers.map(publisher => {
        if (publisher.name === publisherName) {
            return {
                ...publisher,
                ...updatedPublisher
            };
        }
        return publisher;
    });

    res.send('Publisher updated successfully');
});

router.delete('/delete/:name', (req, res) => {
    const publisherName = req.params.name;

    publishers = publishers.filter(publisher => publisher.name !== publisherName);

    res.send('Publisher deleted successfully');
});

module.exports = router;
