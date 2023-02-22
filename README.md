<h1>World Pokedex</h1>

<h2>O QUE É A World Pokedex</h2>
<p>Uma pokedex virtual onde você pode ter seus pokemons capturados, onde são exibidas informações sobre eles.</p>

<h2>Utilizado os seguintes modulos</h2>

<ul>
  <li>NodeJS - para criação do Web Server</li>
  <li>Express - para trabalhar com requisições e respostas</li>
  <li>Express-session - para gerenciar seções</li>
  <li>Express-handlebars - Renderização de paginas HTML</li>
  <li>Sequelize - para comunicação com banco de dados MySQL</li>
  <li>MySQL2 - Para gerenciar o banco de dados</li>
  <li>Nodemon - monitorar a mudança de codigo</li>
  <li>Session-file-store - armazenamento de session localmente</li>
</ul>
<p>Para a instalação dos modulos basta dar um npm install</p>
<p>Também é preciso criar um banco de dados chamado 'podedex'</p>

<h2>ROTAS</h2>
<p>Para o user padrão é possivel acessar as seguintes rotas</p>
<ul>
  <li>Rota '/' que é a home</li>
  <li>Rota '/login' rota de login</li>
  <li>Rota '/singup' rota de registro</li>
  <li>Rota '/addpokemon' rota para adicionar um pokemon ao user</li>
  <li>Rota 'verpokemon/{id-do-pokemon-no-db}' rota para a edição de um pokemon no banco de dados</li>
  <li>Rota '/logout' rota para fazer o logout de sua conta</li>
</ul>

<h2>Adicionar Pokemon</h2>
<p>Você pode adicionar qualquer pokemon, pesquisando ele pelo nome ou o ID da WorldPokedex dele. </p>

