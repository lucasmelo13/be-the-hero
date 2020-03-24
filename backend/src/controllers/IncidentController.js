

const connection = require ('../database/connection')

module.exports ={
    async index (request,response){
        const { page = 1 }= request.query //vai buscar na url o parametro "p"
        
        const [count] = await connection('incidents').count(); // como o resultado disso vai retonrar um aarray entao , pode colocar o count  --> [count] pois ai so fica com um objeto

        // console.log(count)

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id' ) // vai trazer dados da tablea de ongs , onde o ongs.id seja igual ao incidentes.ong_id
        .limit(5)
        .offset((page - 1) * 5)  // 1(na primeira pagia) - 1 = 0 ---> 0*5 = 0 , dai ira começar a partir do zero e pegar os proximos 5 registros , dai na proxima página ele sera 2 - 1 = 1 ---> 1*5 = 5 , ou seja iraa pular os 5 registros anteriores e colocar os proximos
        .select([
            'incidents.*',
            'ongs.name', 
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'])
            //nao pode continuar assim : "select('*')" pois o id das Ongs estava sobrepondo o id do incidente , por isso escolhemos  a ordem dos valores a serem puxados

        response.header('X-Total-Count', count['count(*)']) // vai mostrar o numero total de casos

        return response.json(incidents)
    },

    
    
    async create(request, response){
        const {title, description, value} =request.body
        request.headers 
        /**
         * //o headers=cabeçalho guarda informaçoes da requisição , 
         * inclusive a autenticaçao , dai conseguirmos colcar a chave estrangeira (id)
         *  da ONG que criou o CASO 
         */
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({id})

    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
        .where('id',id) //vai comparar o da variavel acima , com o id da tabela
        .select('ong_id')
        .first()

        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: 'Operation not permited.'}) //caso queira saber é so pesquise http status code
        }

        await connection('incidents').where('id',id).delete()

        return response.status(204).send()

    }
}