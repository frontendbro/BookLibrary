const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')

class Book {
    constructor(
        id = uuid(),
        title = '',
        description = '',
        authors = '',
        favorite = '',
        fileCover = '',
        fileName = '',
        fileBook = ''
    ) {
        this.id = id
        this.title = title || ''
        this.description = description || ''
        this.authors = authors || ''
        this.favorite = favorite || ''
        this.fileCover = fileCover || ''
        this.fileName = fileName || ''
        this.fileBook = fileBook || ''
    }
}

const store = {
    books: [],
}

router.get('/', (req, res) => {
    const { books } = store
    res.render('book/index', { title: 'Books', books })
})

router.get('/create', (req, res) => {
    res.render('books/create', { title: 'Create book' })
})

router.get('/', (req, res) => {})

module.exports = router