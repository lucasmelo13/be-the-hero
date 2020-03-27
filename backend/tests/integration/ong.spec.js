const request = require('supertest')
const app = require('../../src/app')
const connection = require ('../../src/database/connection')

describe('ONG',()=>{
    beforeEach(async() => { // o async aqui pois preecisamos aguardar essa funçao finalizar para irmos em diante ao teste , e por ser uma criação de tabelas , pode demorar
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll ( async()=>{    // tbm ira demorar , por isso utilizamos async await
        await connection.destroy()
    })
    
    it('should be able to create a new ONG',async()=>{  // o async aqui pois preecisamos aguardar essa funçao finalizar para irmos em diante ao teste
        const response =  await request(app)
        .post('/ongs')
        .send({
            name: "APAD2",
            email: "contato@fan.com",
            whatsapp:"4700000000",
            city: "Rio do Sul",
            uf: "SC"
        })

        // console.log(response.body)

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})