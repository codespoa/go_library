const FakesUserRepository = require('../repositories/fakes/UsersRepositoryFake')
const AuthenticateUserService = require('../services/AuthenticateUserService')


describe("AuthenticateUser", () => {
  it("should be responsible for logging the user", async () => {


    const user = await AuthenticateUserService(FakesUserRepository).execute({
      email: "jonh@example.com",
      password: '123456'
    })

    expect(user).toHaveProperty("token")

  })

  it("should be checks if there is no user", async () => {

    expect(
      AuthenticateUserService(FakesUserRepository).execute({
        email: "jonh@e.com",
        password: "123ds456",
      })
      
    ).rejects.toThrow()

  })

})
