const User = require('../models/User')
const bcrypt = require('bcrypt')

const seedData = {
  User: {
    name: 'Administrator',
    email: 'admin@site.com',
    role: 'admin',
  }
}

async function seed() {
  try {
    const userFound = await User.find()

    if (userFound.length > 0) return

    const hash = await bcrypt.hash('admin', 10)
    const newUser = new User({ ...seedData.User, password: hash })
    await newUser.save()

    console.log('Basic user seeded');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seed