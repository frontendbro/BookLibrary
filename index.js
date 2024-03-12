const express = require('express')
const { v4: uuid } = require('uuid')


class Book {
  constructor(id = uuid(), title = '', description = '', authors = '', favorite='', fileCover='', fileName='') {
    this.id = id
    this.title = title || ''
    this.description = description || ''
    this.authors = authors || ''
    this.favorite = favorite || ''
    this.fileCover = fileCover || ''
    this.fileName = fileName || ''
  }
}

const store = {
  books: []
}

const app = express()
app.use(express.json())

// Login
app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({id:1, mail: 'test@mail.ru'})
})

// Get list
app.get('/api/books', (req, res) => {
  const { books } = store
  res.json(books)
})

// Get by id
app.get('/api/books/:id', (req, res) => {
  const { books } = store
  const {id} = req.params
  const currentBook = books.find(book => book.id === id)

  if (currentBook) {
    res.json(currentBook)
  } else {
    res.status(404)
    res.json('Code: 404 | Book was not found')
  }
})

// Create
app.post('/api/books', (req, res) => {
  const { books } = store
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const id = uuid()
  const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName)
  books.push(newBook)

  res.status(201)
  res.json(newBook)
})

// Update
app.put('/api/books/:id', (req, res) => {
  const { books } = store
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const {id} = req.params
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
          fileName
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
        fileName
      })
  } else {
      res.status(404)
      res.json('Code:404 | Book was not found')
  }

  
})

// Delete
app.delete('/api/books/:id', (req, res) => {
  const { books } = store
  const {id} = req.params
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

const PORT = process.env.PORT || 3000
app.listen(PORT)