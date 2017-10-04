
exports.up = function(knex, Promise) {
	return knex.schema.createTable('projects',table=>{
		table.increments('id');
		table.text('title');
		table.text('description');
		table.text('thumbnail_path');
		table.text('path');
		table.text('is_starred').defaultTo(false);
		table.boolean('is_deleted').defaultTo(false);
		table.timestamps(true,true);
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('projects');
};
