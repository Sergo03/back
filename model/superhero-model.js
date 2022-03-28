const { model } = require('mongoose');
// import {model} from 'mongoose'
const superHeroSchema = require('./schema/superhero-schema');
// import superHeroSchema from './schema/superhero-schema'
const SuperHero = model('superheros',superHeroSchema );
module.exports= SuperHero