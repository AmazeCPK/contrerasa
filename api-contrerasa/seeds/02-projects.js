
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {title:'edmsweep',description:'Project for VAB. EDM festival tickets',path:'https://edmsweep.com'},
        {title:'Christian Bravo Photo',description:'Photography portfolio website',path:'https://cbravophoto.com'},
        {title:'Contreras@',description:'Portfolio website for myself',path:'https://contrerasa.com'}
      ]);
    });
};
