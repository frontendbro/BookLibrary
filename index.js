const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const fileMulter = require('./file')

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

const app = express()
app.use(express.json())

// Login
router.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
})

// Get list
router.get('/api/books', (req, res) => {
  const { books } = store
  res.json(books)
})

// Get by id
router.get('/api/books/:id', (req, res) => {
  const { books } = store
  const { id } = req.params
  const currentBook = books.find(book => book.id === id)

  if (currentBook) {
    res.json(currentBook)
  } else {
    res.status(404)
    res.json('Code: 404 | Book was not found')
  }
})

// Create
app.use('/api/books', fileMulter.single('fileBook'), (req, res, next) => {
  if (req.file) {
    const { path } = req.file
    res.json({ path })
  }
  // res.json()
  next()
})

router.post('/api/books', (req, res) => {
  const { books } = store
  const id = uuid()

  const book = {
    id,
    ...req.body,
    fileBook: req.file ? req.file.path : '',
    fileName: req.file ? req.file.originalname : '',
  }

  const newBook = new Book(
    book.id,
    book.title,
    book.description,
    book.authors,
    book.favorite,
    book.fileCover,
    book.fileName,
    book.fileBook
  )
  books.push(newBook)

  res.status(201)
  res.json(newBook)
})

// Update
router.put('/api/books/:id', (req, res) => {
  const { books } = store
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const { id } = req.params
  const currentBook = books.filter(book => book.id === id)

  if (currentBook) {
    store.books = books.map(book => {
      if (book.id === id) {
        return {
          id,
          title,
          description,
          authors,
          favorite,
          fileCover,
          fileName,
          fileBook,
        }
      }
      return book
    })
    res.json({
      id,
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    })
  } else {
    res.status(404)
    res.json('Code:404 | Book was not found')
  }
})

// Delete
router.delete('/api/books/:id', (req, res) => {
  const { books } = store
  const { id } = req.params
  const currentBook = books.find(book => book.id === id)

  if (currentBook) {
    store.books = books.filter(book => book.id !== id)
    res.status(200)
    res.json('Success!')
  } else {
    res.status(404)
    res.json('Code:404 | Book was not found')
  }
})

app.use(router)
const PORT = process.env.PORT || 3000
app.listen(PORT)
