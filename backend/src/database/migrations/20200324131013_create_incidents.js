
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); //o primary vai tranformar em uma prymary column
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //aqui faz sentido ser nulo , pois nao tem como um incidente ser criado caso nao exista um ONG

        table.foreign('ong_id').references('id').inTable('ongs'); // aqui ta referenciando o ID na tabela ONG da empresa que for criar o incidente

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')

};
