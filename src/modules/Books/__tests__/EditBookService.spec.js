const FakesBookRepository = require('../repositories/fakes/FakesBookRepository')
const CreateBookService = require('../services/CreateBookService')
const EditBookService = require('../services/EditBookService')
const RentBookService = require('../services/RentBookService')

describe("EditBook", () => {
  it("should edit an book", async () => {


    const editBook = await CreateBookService(FakesBookRepository).execute({
      name: "Aventura XYZ",
      bio: "Fooooi",
      author: "Vegeta",
      price: 8000,
      release: new Date(),
      sbnCode: "12sd23212sd232",
    })

    expect(editBook.name).toBe('Aventura XYZ')
    expect(editBook.bio).toBe('Fooooi')
    expect(editBook.author).toBe('Vegeta')

    return editBook

  })

  it("should be not edit a books if not exists", async () => {

    expect(
      EditBookService(FakesBookRepository).execute({
        name: "Aventura X",
        bio: "E mais de 80000 mil",
        author: "Vegeta",
        price: 80000,
        release: new Date(),
        sbnCodeParam: "",
      })

    ).rejects.toThrow('This book not exist')

  })

  it("should be not if status is rented", async () => {

    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sd232",
    })

    const books = await RentBookService(FakesBookRepository).execute({
      sbnCode: '12sd232',
      rented: '5fbb904274e61942f4956267',
      status: 'rented'
    })

    expect(EditBookService(FakesBookRepository).execute({
      name: "Aventura ZYZ",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(Date.now()),
      sbnCode: '12sd2',
    })).rejects.toThrow()

    return books

  })

  it("should be not if rented is diferent with me", async () => {

    await CreateBookService(FakesBookRepository).execute({
      name: "Aventura Z",
      bio: "E mais de 8000 mil",
      author: "Goku",
      price: 8000,
      release: new Date(),
      sbnCode: "12sddsd232",
    })

    const books = await RentBookService(FakesBookRepository).execute({
      sbnCode: '12sddsd232',
      rented: '5fbb904274e61942f4956267',
      status: 'rented'
    })

    expect(books.rented).not.toBe('5fbb904274')

    return books

  })
})

