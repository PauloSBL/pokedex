const express = require('express')
const router = express.Router()


const User = require('../controllers/UsersControllers')
const PokeAPI = require('../controllers/PokeAPIControllers')

const checkAuth = require('../check/checkId').checkAuth

router.get('/verpokemon/:id',checkAuth , User.verPokemon)
router.get('/',checkAuth ,User.showPokemons)
router.get('/singup', User.createUser)
router.post('/singup', User.createUserSave)
router.post('/removeuser', User.removeUser)
router.get('/login', User.login)
router.get('/addpokemon',checkAuth , User.addPokemon)
router.get('/removerpokemon/:id', User.removePokemon)
router.post('/addpokemon', PokeAPI.addPokemon)
router.post('/updatepokemon', User.updatePokemon)
router.post('/addpokemonSave', User.addPokemonSave)
router.get('/editarpokemon/:id', User.editPokemon)
router.get('/logout', User.logout)
router.post('/login', User.loginEnter)
module.exports = router