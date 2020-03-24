
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

const express = require('express')// nao utiliza o ./ pois o express é um pacote e nao um arquivo
const cors = require('cors')
const routes = require('./routes') //o ./ é para referenciar a pasta onde esta


const app = express()

app.use(cors({}))
app.use(express.json()) // Isso aqui esta avisado que antes das requisiçoes esse cara aqui , vai converter todos os JSON em JS
app.use(routes)



app.listen(3333)