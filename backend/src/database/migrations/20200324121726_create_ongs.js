
//O metodo UP é o que vc quer que faça e o down é o metodo que caso ocorra algo de errado é ira por exemplo , deletar a tabela criada com o metodo UP

exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //o primary vai tranformar em uma prymary column  e o ID é um texto , pois sera um numero mais complexo porque sera o o login da ONG 
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable(); //o 2 é o tamanho do texto (SP , RJ e etc....)

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs')
};
