
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
const {celebrate, Segments, Joi} = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router()


routes.post('/sessions' ,celebrate({
    [Segments.BODY]:Joi.object().keys({
        id: Joi.string().required().length(8)
    })
}),SessionController.create)

routes.get('/ongs',OngController.index)// vai fazer um select e mostrar todas as ongs inseridas

/**
 * Query Params
 * Route
 * Body
 */
routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}),OngController.create) // o celebrate fica antes , pq ele ira validar as informaçoes do usuário antes de fazer o cadastro

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown() //o unknow serve pois voce nao conhece todos os header que estao sendo enviados , para ele so se focar para as propriedades que ele esta validando acima
}) ,ProfileController.index)


routes.get('/incidents',celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()  // ira validar na URL o page "http://localhost:3333/incidents?page=1"
        })

    }), IncidentController.index)


routes.post('/incidents',celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    }) ,celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required()
        })
    }),IncidentController.create)


routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({  //o PARAMS se foca em validar a ID na URL e nao no header "http://localhost:3333/incidents/22"
        id: Joi.number().required(),
    })
}),IncidentController.delete)

module.exports = routes