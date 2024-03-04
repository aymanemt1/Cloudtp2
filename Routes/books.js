const express = require('express');
const router = express.Router();

let books = [
    { title: "Livre 1", author: "Auteur 1", publisher: "Publisher 1", category: "Catégorie 1", year: 2020 },
    { title: "Livre 2", author: "Auteur 2", publisher: "Publisher 2", category: "Catégorie 2", year: 2018 },
];

router.get('/all', (req, res) => {
    res.json(books);
});

router.get('/authors/:livrename', (req, res) => {
    const livrename = req.params.livrename;
    const authorsOfBook = books.filter(book => book.title === livrename).map(book => book.author);
    res.json(authorsOfBook);
});

router.get('/publishers/:livrename', (req, res) => {
    const livrename = req.params.livrename;
    const publishersOfBook = books.filter(book => book.title === livrename).map(book => book.publisher);
    res.json(publishersOfBook);
});

router.get('/listCategorie/:category', (req, res) => {
    const category = req.params.category;
    const booksInCategory = books.filter(book => book.category === category);
    res.json(booksInCategory);
});

router.get('/:annee1/:annee2', (req, res) => {
    const annee1 = parseInt(req.params.annee1);
    const annee2 = parseInt(req.params.annee2);
    const booksBetweenYears = books.filter(book => book.year >= annee1 && book.year <= annee2);
    res.json(booksBetweenYears);
});

router.post('/add', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

router.put('/update/:title', (req, res) => {
    const title = req.params.title;
    const updatedBook = req.body;
    books = books.map(book => {
        if (book.title === title) {
            return updatedBook;
        }
        return book;
    });
    res.json(updatedBook);
});

router.delete('/delete/:title', (req, res) => {
    const title = req.params.title;
    books = books.filter(book => book.title !== title);
    res.sendStatus(204);
});

module.exports = router;
