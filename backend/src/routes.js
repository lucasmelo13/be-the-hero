
/**
 * Rota / Recursos
 */

 /**
 * Metodo HTTP:
 * 
 * GET : Buscar uma informçao no back-end , os navegadores costuma usar esse comando quando vc da ENTER em algumaa URL
 * POST: Criar uma informação no back-end
 * PUT : Alterar uma informação no back-end
 * Delete: Deletar uma informação no back-end
 */

 /**
 * Tipos de parâmetros:
 * 
 * Query Params : Parametros nomeados enviados na rota após o "?" (Filtros , paginas) Ex: http://localhost:3333/page=2&users?name=Diego (ele quer todos os Diego da pagina 2)
 *      E para conseguir retornar esse valor é preciso : 
                                                        * app.get('/users' , (request, response) =>{
                                                        *   const params = request.query
                                                            
                                                            console.log(params)

                                                            return response.json({
                                                                "evento": 'Semana OminiStack 11.0',
                                                                "aluno": "Lucas Melo de Oliveira Afonso"
                                                            })
                                                        })
                                                        app.listen(3333)


 * Route Params : Parâmetros utilizados para identificar recursos Ex: /users/:id   ->   http://localhost:3333/users/1
        E para conseguir retornar esse valor é preciso : 
                                                            * app.get('/users/:id' , (request, response) =>{
                                                                const params = request.params
                                                                
                                                                console.log(params)

                                                                return response.json({
                                                                    "evento": 'Semana OminiStack 11.0',
                                                                    "aluno": "Lucas Melo de Oliveira Afonso"
                                                                })
                                                            })

                                                            app.listen(3333)


 * Request Body : Corpo da requisição, utilizado para criar ou alterar recursos , podendo ser utlizado o POST (LEMRBANDO que para conseguir ler o JSON de uma criçao de usuário , la em cima da página é preciso digitar "app.use(express.json())n")
     E para conseguir retornar esse valor é preciso :                                                       
                                                            app.post('/users' , (request, response) =>{
                                                                const body = request.body
                                                                
                                                                console.log(body)

                                                                return response.json({
                                                                    "evento": 'Semana OminiStack 11.0',
                                                                    "aluno": "Lucas Melo de Oliveira Afonso"
                                                                })
                                                            })

                                                            app.listen(3333)
 */
 
/**
 * SQL : MySQL , SQLite , PostgreSQL , Oracle , Microsoft SQL Server
 * NoSQL : MongoDB , CouchDB, etc
 */


 /**
 * Driver : SELECT * FROM users
 * Query Builder : table('users').select('*').where()
 */

const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router()


routes.post('/sessions' ,SessionController.create)

routes.get('/ongs',OngController.index)// vai fazer um select e mostrar todas as ongs inseridas
routes.post('/ongs',OngController.create)

routes.get('/profile' ,ProfileController.index)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id',IncidentController.delete)

module.exports = routes