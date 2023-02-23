const request = require('request');
const Pokemon = require('../models/Pokemon')



module.exports = class PokeAPI{
    //acesso a pokeapi para buscar os dados do pokemon
    static addPokemon(req, res){
        try{
            //const search pega o input digitado(NOME OU ID DO POKEMON na pokedex Oficial)
            const { search } = req.body;

            //defino que a url é a string mais a const search(contem o nome ou o id)
            const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
        

            const options = {
                url: url,
                port: 443,
                path: '/',
                method: 'GET',
                rejectUnauthorized: false /// <<<== here
              };

            // aqui faço uma requisição na url
            request.get(options, (error, response, body) => {
            if (error) {
                console.error(error)
                res.render('error')
                return;
            }
            
            //aqui eu trato o json transformando ele em um objeto
            const data = JSON.parse(body);

            //aqui eu renderizo a pagina addpokemon e passo para ela todas as informações do pokemon que a API retornou
            res.render('addpokemon', { data })
            });

        }catch(err){
            console.log(err)
            const data = null
            res.render('home')
        }
    }
}