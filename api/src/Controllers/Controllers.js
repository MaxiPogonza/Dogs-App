const axios = require('axios');
const { Dog, Temperament} = require('../db')


const getApi = async () => {
    const dogsURL = await axios.get('https://api.thedogapi.com/v1/breeds');
    let dogsInfo = await dogsURL.data.map((dog) => {
        return {
            id : dog.id,
            name : dog.name,
            temperament : dog.temperament,
            weight : dog.weight.imperial,
            height: dog.height.metric,
            lifeTime : dog.life_span,
            image : dog.image.url,
            }
        })
        return dogsInfo
    }

const getDB = async () => {
         let dogMap =  await Dog.findAll({
            include: {
                model: Temperament,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        dogMap = dogMap.map(dog => {
            return {
            id: dog.id,
            name:dog.name,
            weight: dog.weight,
            lifeTime: dog.lifeTime,
            image: dog.image,
            createdInDb: dog.createdInDb,
            height: dog.height,
            temperament : dog.temperaments.map(e => {return e.name}).join(',')
        }
    })
        
        return dogMap
       
    }

const getAllDogs = async () => {
        let dbInfo = await getDB();
        let apiInfo = await getApi();
        let allInfo = apiInfo.concat(dbInfo);
        return allInfo 
    }



    module.exports = { getAllDogs };