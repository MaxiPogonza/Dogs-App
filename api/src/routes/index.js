const { Router } = require('express');
const { getAllDogs } = require('../Controllers/Controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament} = require('../db')
const router = Router();
const axios = require('axios');
const {Sequelize, Model} = require('sequelize');
const e = require('express');


// Configurar los routers

router.get('/dogs', async (req,res) => { 
    const {name} = req.query;
    const allDogs = await getAllDogs();
    try{
      if(name) {
      const dogFilter = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
      dogFilter.length ?
      res.status(200).send(dogFilter) :
      res.status(404).send({error: 'Dog not found'})
            
      } else {
        return res.status(200).send(allDogs);
       }
    } catch(err){
     res.status(404).send(err.message);
         }
    })
    
    
    


    router.get('/dogs/:id', async (req, res) => {
        const {id} = req.params ; 
        try {
         const dogs = await getAllDogs();
         const dogId= dogs.filter((e) => e.id == id)
         if(dogId.length) {
           return res.status(200).send(dogId[0])
        }else {
         return res.status(404).send("Dog not found")
         }
        } catch(error) {
           res.status(404).send(error.message)
        }
       });

    
    router.get('/temperaments', async (req,res) => {
     try {
            const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds')
            const dogsTemperament = await apiInfo.data.map (el => el.temperament)
            const dogsSplit = await dogsTemperament.join().split(',')
            const dogsTrim = await dogsSplit.map(e => e.trim())
            await dogsTrim.forEach( async (e) => {
                if(e.length > 0){
                    await Temperament.findOrCreate({
                        where : {name : e}, 
                    })
                }
            })
            const allTemperaments = await Temperament.findAll()
            // console.log(allTemperament)
            return res.status(200).json(allTemperaments)
        }catch (error){
             res.status(404).send({error: 'There are not temperaments'})
         }
    })

router.post('/dogs', async (req,res) => {
try{
        let {
            name,
            height,
            weight,
            lifeTime,
            image,
            createdInDb,
            temperament
        } = req.body;

        const dogInDb = await Dog.findOne({
            where: { name: name }
        })
        if(dogInDb) {
            return res.status(404).send('The dog already exist')
        } else {
            let DogCreated = await Dog.create({
                name,
                height,
                weight,
                lifeTime,
                image,
                createdInDb
            })
            
            let tempDeDB = await Temperament.findAll({
                where: {name: temperament }
            }) 
             DogCreated.addTemperament(tempDeDB)
            return res.status(200).send("Dog created successfully")
        }
      } catch (error) {
        res.status(404).send("Dog not found")
      }
    })

router.delete('/dogs/:id', async (req,res) => { 
    let { id } = req.params;
    try{
        const dog = await Dog.findOne(
           { where: {id: id}}
        )
        console.log(dog)
        await Dog.destroy({
            where: {id: id}
        })
        res.send(`Delete dog ${dog.name}`)
    } catch(error){
        res.send({error:'Dog not found'})
    }
})

module.exports = router;