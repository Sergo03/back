const { Schema } = require("mongoose");
// import { Schema } from 'mongoose'

const superHeroSchema = Schema({
    nickname:{
        type: String
    },
    real_name:{
        type:String
    },
    origin_description:{
        type:String
    },
    superpowers:{
        type:String
    },
    catch_phrase:{
        type:String
    },
    images:{
        type:String
    }
});

module.exports= superHeroSchema;