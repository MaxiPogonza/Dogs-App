import { GET_ALL_DOGS, GET_TEMPERAMENTS, GET_MIN_AKITA, FILTER_BY_TEMPERAMENTS, FILTER_CREATED, GET_DETAIL, FILTER_BY_ABC, GET_NAME, POST_DOG, FILTER_BY_WEIGHT } from "../actions/index";


const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail: {},
  }
  function rootReducer (state = initialState, action) {
  
    switch(action.type) {
      
        case GET_ALL_DOGS:
          return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload,
        };

        case GET_MIN_AKITA: 

        const allDogFilter= state.allDogs.filter((dog) => parseInt(dog.weight) <= 60)
        return{...state, dogs:allDogFilter}
        
        case FILTER_BY_WEIGHT:
          const allDogWeight = state.allDogs.filter(d => d.weight)
        const sortWeight = action.payload === 'livianos' ? allDogWeight.sort((a, b) => {
          const split1 = a.weight.split("-")
          const split2 = b.weight.split("-")
         return parseInt(split1[1]) - parseInt(split2[1])
        })  :
        allDogWeight.sort((a,b) =>{
          const split1 = a.weight.split("-")
           const split2 = b.weight.split("-")
          return parseInt(split1[1]) - parseInt(split2[1])
      }).reverse()
        
        return {
          ...state,
          dogs: sortWeight,
      };



        case GET_TEMPERAMENTS: 
        return { ...state, temperaments: action.payload  };

        case GET_DETAIL: 
        return {...state, detail: action.payload};

        
        case POST_DOG: 
        return {...state };


        case FILTER_BY_TEMPERAMENTS:
          const dogArray = state.allDogs
          const filterTemp = action.payload === 'All' ?  dogArray : dogArray.filter((e) =>{  
            return e.temperament?.includes(action.payload)
           });
            
          return { ...state, dogs: filterTemp };
     

        case FILTER_CREATED:
          const dogArray2 = state.allDogs
          const filterCreate = action.payload === 'creados'? dogArray2.filter(e => e.createdInDb) : dogArray2.filter(e => !e.createdInDb)
          
          return {...state, dogs: action.payload === "todos" ? dogArray2 : filterCreate };


        case GET_NAME:
          return { ...state, dogs: action.payload }


        case FILTER_BY_ABC:
        const filterDogs = action.payload === "A-Z" ? state.dogs.sort((a,b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          })
        : state.dogs.sort((a,b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
          });
        return {...state, dogs: filterDogs };
       
       
        default : return {...state}

 }
        
  }
export default rootReducer ; 