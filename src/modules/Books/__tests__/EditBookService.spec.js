const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')
const EditBookService = require('../services/EditBookService')
const RentBookService = require('../services/RentBookService')

describe("EditBook", () => {
  it("should edit an book", async () => {


    const editBook = await CreateBookService(FakesBookRepository).execute({
      title: "Aventura XYZ",
      bio: "Fooooi",
      author: "Vegeta",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sd23212sd232",
    })

    expect(editBook.title).toBe('Aventura XYZ')
    expect(editBook.bio).toBe('Fooooi')
    expect(editBook.author).toBe('Vegeta')

    return editBook

  })

  it("should be not edit a books if not exists", async () => {

    expect(
      EditBookService(FakesBookRepository).execute({
        title: "Aventura X",
        bio: "E mais de 80000 mil",
        author: "Vegeta",
        price: 80000,
        category: "Horror",
        release: new Date(),
        isbnParam: "",
      })

    ).rejects.toThrow('This book not exist')

  })

  it("should be not if status is rented", async () => {

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sd232",
    })

    const books = await RentBookService(FakesBookRepository).execute({
      isbn: '12sd232',
      rented: '5fbb904274e61942f4956267',
      status: 'rented'
    })

    expect(EditBookService(FakesBookRepository).execute({
      title: "Aventura ZYZ",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(Date.now()),
      isbn: '12sd2',
    })).rejects.toThrow()

    return books

  })

  it("should be not if rented is diferent with me", async () => {

    await CreateBookService(FakesBookRepository).execute({
      title: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      category: "Horror",
      release: new Date(),
      isbn: "12sddsd232",
    })

    const books = await RentBookService(FakesBookRepository).execute({
      isbn: '12sddsd232',
      rented: '5fbb904274e61942f4956267',
      status: 'rented'
    })

    expect(books.rented).not.toBe('5fbb904274')

    return books

  })
})

