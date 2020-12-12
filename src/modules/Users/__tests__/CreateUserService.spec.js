const FakesUserRepository = require('../repositories/fakes/UsersRepositoryFake')
const CreateUserService = require('../services/CreateUserService')

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {

    const user = await CreateUserService(FakesUserRepository).execute({
      name: "John Doe",
      email: "jonh@test.com",
      password: "123456",
    })

    expect(user).toHaveProperty("name")
    expect(user).toHaveProperty("email")
    expect(user).toHaveProperty("password")

    return user

  })

  it("should be not create two users with same email", async () => {
    createUser = CreateUserService

    expect(
      createUser(FakesUserRepository).execute({
        name: "John Doe",
        email: "jonh@example.com",
        password: "123456",
      })
      
    ).rejects.toThrow()

  })
})
