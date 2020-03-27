//Teste unitario , é feito com componentes de uma forma extremamente isolada , sem encostar em banco de dados e outros componentes
const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique Id',()=>{
    it('should generate an Unique ID',()=>{//isto (deve gerar um UNique ID)
         // expect(2+2).toBe(4)
         const id = generateUniqueId()

         expect(id).toHaveLength(8) // ele espera um id de 8 caracteres


    })
}) 