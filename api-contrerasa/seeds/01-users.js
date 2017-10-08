
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
          password: '$2a$05$OyFko2o4dqgEkrAbVnByLuWP4HI5wu76XQFDkXc43VvedhPusyD6G',
        },
        {
          password: "$2a$05$F73DVxv18VRLGJKwdj130uoZI2L//0t.J1qOjNkCkc2A3T.xMCHou",
          email: "test@gmail.com",
          first_name: "Natasha",
          last_name: "Contreras",
          role: null,
          is_deleted: false,
          created_at: "2017-10-05T02:35:38.843Z",
          updated_at: "2017-10-05T02:35:38.843Z"
        }
      ]);
    });
};
