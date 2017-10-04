
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'amazecpk@gmail.com',
          first_name: 'Anthony',
          last_name: 'Contreras',
          role: 'admin',
          password: 'test',
        }
      ]);
    });
};
