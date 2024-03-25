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
  books: [
    {
      id: '1',
      title: 'The Great Gatsby',
      description: 'The Great',
    },
    {
      id: '2',
      title: 'The Great Gatsby 2',
      description: 'The Great 2',
    },
    {
      id: '3',
      title: 'The Great Gatsby 3',
      description: 'The Great 3',
    },
  ],
}

router.get('/', (req, res) => {
  const { books } = store
  res.render('book/index', { title: 'Books', books: books })
})

router.get('/create', (req, res) => {
  res.render('book/create', { title: 'Create book', todo: {} })
})

router.post('/create', (req, res) => {
  const { books } = store
  const { title, description } = req.body

  const newBook = new Book(uuid(), title, description)
  books.push(newBook)

  res.redirect('/books')
})

router.get('/view/:id', (req, res) => {
  const { books } = store
  const { id } = req.params
  const book = books.find(book => book.id === id)

  if (!book) {
    res.status(404).send('404 Not Found')
    return
  } else {
    res.render('book/view', { title: book.title, book })
  }
})

router.get('/update/:id', (req, res) => {
  const { books } = store
  const { id } = req.params
  const book = books.find(book => book.id === id)

  if (!book) {
    res.status(404).send('404 Not Found')
    return
  } else {
    res.render('book/update', { title: book.title, book })
  }
})

router.post('/update/:id', (req, res) => {
  console.log('xxxxxxxxxxx');
  const { books } = store
  const { id } = req.params
  const { title, description } = req.body

  const book = books.find(book => book.id === id)

  if (!book) {
    res.status(404).send('404 Not Found')
    return
  } else {
    book.title = title
    book.description = description

    res.redirect('/books')
  }
})

router.get('/delete/:id', (req, res) => {
  const { books } = store
  const { id } = req.params

  const bookIndex = books.findIndex(book => book.id === id)

  if (bookIndex === -1) {
    res.status(404).send('404 Not Found')
    return
  } else {
    books.splice(bookIndex, 1)

    res.redirect('/books')
  }
})

module.exports = router
