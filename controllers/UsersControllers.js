const User = require('../models/User')
const Pokemon = require('../models/Pokemon')
const request = require('request')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')


module.exports = class UserController{
    static login(req, res){
        res.render('login')
    }

    //função para mostrar os pokemons do usuario
    static async verPokemon(req, res){    
    const id = req.params.id
    const securityAuth = req.session
    Pokemon.findOne({ where: { id: id }, raw: true })
      .then((poke) => {
        res.render('verpokemon', { poke, securityAuth })
      })
      .catch((err) => console.log())
    }



    // função de login 
    static async loginEnter(req, res){
        const { usuario , senha } = req.body

        // find user
        const user = await User.findOne({ where: { usuario:usuario } })
    
        if (!user) {
          res.render('login')
    
          return
        }
        

        // compare password
        const passwordMatch = bcrypt.compareSync(senha, user.senha)
        if (!passwordMatch) {
          res.render('login')
    
          return
        }
    
        // define que o userid vai ser igual ao id do usuario no banco de dados 
        req.session.userid = user.id
        

        req.session.save(() => {
          res.redirect('/')
        }) 
    }

    //CRUD USER

    static createUser(req, res){
        res.render('singup')
    }
   

    //função para a criação de um usuario
    static async createUserSave(req,res){
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(req.body.senha, salt)
        const password = req.body.senha
        
        const formAdd = {
            usuario:req.body.usuario,
            senha:hashedPassword
        }

        let confirma = req.body.senhaConfirm

        try{
            if(confirma == password){
                await User.create(formAdd)
                .then((user)=>{
                    req.session.userid = user.id
                    req.session.userid = user.id
            
                    req.session.save(() => {
                      res.redirect('/')
                    })
                  })
            }else{
                console.log('senha errada')
            }

        }catch(err){
            console.log(err)
        }
    }

    //função para remover o usuario, funciona porém não criei a pagina para remover usuario
    static async removeUser(req,res){
        const id = req.body.id
        await User.destroy({where:{id:id}})        
        res.redirect('/')
    }

    static async editPokemon(req,res){
        const id = req.params.id
        const poke = await Pokemon.findOne({where: {idPokemon:id}, raw:true})
        res.render('editPokemon',{poke})
    }

    //mostra todos os pokemons do usuario logado
    static async showPokemons(req, res) {
      //pesquisa todos os pokemons que tem na coluna userId o mesmo id do usuario logado
      const securityAuth = req.session.userid
      const poke = await Pokemon.findAll({
        where: { userId: req.session.userid },
        raw: true,
      });
      const size = poke.length; //aqui conta quantos pokemons o usuario tem e passa junto com a pagina quando for renderizada, assim no arquivo HTML você pode acessar as informações
      res.render("home", { poke, size, securityAuth });
    }

    // renderiza a pagina
    static addPokemon(req, res){
        const securityAuth = req.session.userid
        res.render('addpokemon',{securityAuth})
    }
    

    static async addPokemonSave(req, res){
        try {
            const idPoke = req.body.id

            // Consulta a PokeAPI para obter os dados do Pokémon
            request(`https://pokeapi.co/api/v2/pokemon/${idPoke}`, async (error, response, body) => {
              if (error) {
                console.error(error);

              } else {
                const pokemonData = JSON.parse(body);
                const namePoke = pokemonData.name

                // Cria um novo registro de Pokémon no banco de dados
                //todas as colunas estão sendo preenchidas com as informações que retiramos da pokeAPI
                const pokemon = await Pokemon.create({
                  idPokemon: pokemonData.id,
                  nome: pokemonData.name,
                  img: `https://img.pokemondb.net/artwork/${namePoke}.jpg`, // as imagens eu pego desse site
                  spd: pokemonData.stats[0].base_stat,
                  atk: pokemonData.stats[1].base_stat,
                  def: pokemonData.stats[2].base_stat,
                  type1: pokemonData.types[0].type.name,
                  type2: pokemonData.types[1] ? pokemonData.types[1].type.name : null,
                  userId:req.session.userid, // essa tabela diz que o dono desse pokemon é omesmo que esta com a session ativa
                  vantagens: ''
                });
              }
            });
          }catch (error) {
            console.error(error);
          }
          res.render('addpokemon');
    }


    static async removePokemon(req, res) {
      const id = req.params.id //pega o id que foi passado por URL
      await Pokemon.destroy({where:{id:id}}) // aqui destroy o pokemon que tem o id igual ao id desejado
      res.redirect('/')
    }


  // essa função atualza o nome do pokemon
  static async updatePokemon(req, res) {

    // pego o id do banco de dados 
    const id = req.body.id
    
    //crio um objeto com novo com a propriedade nome(tem que ser o mesmo nome que a coluna que vai ser editada no banco de dados)
    const novo = {
      nome: req.body.nome  // req.body.nome pega o novo nome que você digitou no input
    }
    //função de atualização que vai dar o novo nome para o item dentro da tabela pokemon onde o id é igual ao id do pokemon que você quer editar
    Pokemon.update(novo, { where: { id: id } }) 
      .then(() => {
          res.redirect('/')
      })
      .catch((err) => console.log())
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }

}