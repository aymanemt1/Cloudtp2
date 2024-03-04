const express = require('express');
const router = express.Router();

let authors = [
    { name: "Auteur 1", books: 1 },
    { name: "Auteur 2", books: 2 },
];

router.get('/all', (req, res) => {
    res.json(authors);
});

router.get('/names', (req, res) => {
    const authorNames = authors.map(author => author.name);
    res.json(authorNames);
});

router.get('/books', (req, res) => {
    const booksAuthor = authors.map(author => ({ name: author.name, books: author.books }));
    res.json(booksAuthor);
});

router.post('/add', (req, res) => {
    const newAuthor = req.body;
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.put('/update/:name', (req, res) => {
    const name = req.params.name;
    const updatedAuthor = req.body;
    authors = authors.map(author => {
        if (author.name === name) {
            return updatedAuthor;
        }
        return author;
    });
    res.json(updatedAuthor);
});

router.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    authors = authors.filter(author => author.name !== name);
    res.sendStatus(204);
});

module.exports = router;
