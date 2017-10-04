import Knex from 'knex';
import config from './../../knexfile';
const env = 'staging';

const knex = Knex(config.staging);

export default knex;