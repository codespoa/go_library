const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')

describe("CreateBook", () => {
  it("should be able to create a new book", async () => {

    const book = await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sd2",
    })

    expect(book).toHaveProperty('title')
    expect(book).toHaveProperty('author')
    expect(book).toHaveProperty('price')
    expect(book).toHaveProperty('category')
    expect(book).toHaveProperty('release')
    expect(book).toHaveProperty('isbn')

    return book

  })

  it("should be not create two books with same isbn", async () => {

    expect(
      CreateBookService(FakesBookRepository).execute({
        title: "Aventura Z",
        bio: "E mais de 8000 mil",
        author: "Goku",
        price: 8000,
        category: "Horror",
        release: new Date(),
        isbn: "12sd2",
      })

    ).rejects.toThrow()

  })
})

