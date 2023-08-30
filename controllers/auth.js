const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {createJWT} = require('../helpers/jwt')

const newUser = async(req, res = express.response) => {

    const {email, password} = req.body

    try {

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'email already in use'
            })
        }

        user = new User(req.body) 

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
    
        await user.save()

        const token = await createJWT(user.id, user.name)
    
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: ''
        })
    }
}
const loginUser = async(req, res = express.response) => {

    const {email,password} = req.body

    try {
        
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'email or password incorrect'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'email or password incorrect'
            })
        }

        const token = await createJWT(user.id, user.name)
        
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: ''
        })
    }
    
}
const renewToken = async(req, res = express.response) => {

    const {uid, name} = req
    const token = await createJWT(uid, name)
    res.json({
        ok: true,
        token
    })
}


module.exports = {
    newUser,
    loginUser,
    renewToken
}