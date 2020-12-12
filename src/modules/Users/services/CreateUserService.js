const { hash } = require('bcryptjs')
const startOfDay = require('date-fns/startOfDay')
const AppError = require('../../../shared/error/AppError')


const CreateUserService = (repository) => ({

  async execute({name, email, phone, date_birth, password}){
    const checkUserExists = await repository.findByEmail(email)

    if(checkUserExists) throw new AppError('This user already in use', 409) 

    const passwordHashed = await hash(password, 8)

    const dateBirthUser = startOfDay(date_birth)
  
    const user = await repository.save({
      name,
      email,
      phone,
      date_birth: dateBirthUser,
      password: passwordHashed,
    })
  
    return user
  }
  
})

module.exports = CreateUserService