import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS" 
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS" 
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS"
export const FILTER_CREATED = "FILTER_CREATED"
export const FILTER_BY_WEIGHT= "FILTER_BY_WEIGHT"
export const FILTER_BY_ABC = "FILTER_BY_ABC"
export const GET_NAME = "GET_NAME"
export const POST_DOG = "POST_DOG"
export const GET_DETAIL = "GET_DETAIL"
export const GET_MIN_AKITA = "GET_MIN_AKITA"

export function postDog(dog) {
  return async function(dispatch){
    var res = await axios.post("http://localhost:3001/dogs", dog)
   return res.data;
 }
}
export function getMinAkita(){
    return {type: GET_MIN_AKITA}
}
export function getAllDogs (){
    return async function(dispatch){
         var res = await axios.get("http://localhost:3001/dogs")
         return dispatch({type: GET_ALL_DOGS, payload: res.data})
    }
}
export function getName (name){
    return async function(dispatch){
        try{
            var res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({type: GET_NAME, payload: res.data})
        }
       catch(err){
            console.log(err);
       }
    }

}
export function getTemperaments () {
    return async function(dispatch){
        var res = await axios.get("http://localhost:3001/temperaments")
        return dispatch({type: GET_TEMPERAMENTS, payload: res.data})
    }
}

export function filterByWeight(payload){
    return {
        type: FILTER_BY_WEIGHT,
        payload: payload

    }
}


export function filterByTemperaments (payload){

    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload,
    }
}
    export function filterCreated(payload){
        return {
            type: FILTER_CREATED,
            payload,

        }
    }
    
    export function filterByAbc(payload){
        return {
            type: FILTER_BY_ABC,
            payload,

        }
    }
    export function getDetail (id){
        return async function(dispatch){
            try{
            var res = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({type: GET_DETAIL, payload: res.data})
        } catch(err) {
            console.log(err);

        }
}
    }