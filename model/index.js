const SuperHero = require("./superhero-model");
// import SuperHero from './superhero-model'

const listHeros = async () => {
    return await SuperHero.find();
}
const addHero = async (body) =>{
    return SuperHero.create(body)
}

const updateHero = async (heroId, body)=> {
    const result = await SuperHero.findByIdAndUpdate(heroId, body,{new:true})
  return result
}
const getHeroById = async (heroId) => {
    const result = await SuperHero.findById(heroId)
    return result
  };

module.exports= {
    listHeros,
    addHero,
    updateHero,
    getHeroById
}