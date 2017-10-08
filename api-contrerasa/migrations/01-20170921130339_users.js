
exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('users', table =>{
			table.increments('id').notNullable();
			table.text('first_name');
			table.text('last_name');
			table.text('email');
			table.text('password');
			table.enum('role',['guest','member','client','moderator','admin','owner']);
			table.text('token');
			table.timestamp('token_expires');
			table.timestamps(true,true);
			table.boolean('is_deleted').defaultTo(false);
		})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};
