const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

class MongoMock {
  async connect() {
    if (!process.env.MONGO_URI_TEST) {
      throw new Error('MongoDB server not initialized')
    }

    this.database = await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  }

  disconnect() {
    setTimeout(() => {
      return this.database.connection.close()
    }, 2000)
  }
}

module.exports = new MongoMock()