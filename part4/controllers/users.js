const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{ url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})

router.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if(password === undefined || username === undefined) {
        return response.status(400).json({ error: 'password and username can not empty' })
    } else if(password.length < 3 || username.length < 3) {
        return response.status(400).json({ error: 'password or username minimum 3 characters long' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)    
    }
})

module.exports = router