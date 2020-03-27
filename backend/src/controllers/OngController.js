const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports ={
    async index(request, response){  
        const ongs = await connection('ongs').select('*') 
        //novamente aqui ira aguardar uma query acabar
        return response.json(ongs)
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf} = request.body

        const id = generateUniqueId()
    
        await connection('ongs').insert({  
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })  
    /**
     * o insert pode demorar um pouco  , por isso eu so posso retornar o id da ONG
     * quando ele finalizar o insert , por conta disso colocamos o AWAIT de determinar a funçao la em cima
     * como ASYNC 
     */

        return response.json({ id })
    }
}