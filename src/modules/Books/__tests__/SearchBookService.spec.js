const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')
const SearchBookService = require('../services/SearchBookService')

describe("SearchBook", () => {
  it("is responsible for failing if you can't find a book", async () => {

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sd2",
    })

    setTimeout(() => {
      const searchBook = SearchBookService(FakesBookRepository).execute({
        title: 'xirinfula',
        author: 'chaves',
      })

      expect(searchBook).rejects.toThrow()

      return searchBook
    }, 1500)

  })

  it("is responsible for finding a book", async () => {

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sdcsc2",
    })

    const searchBook = await SearchBookService(FakesBookRepository).execute({
      title: 'Aventura Z',
      author: 'Goku',
    })

    expect(searchBook.title).toBe('Aventura Z')

    return searchBook
  })
})
