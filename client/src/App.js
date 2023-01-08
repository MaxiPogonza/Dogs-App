import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import CreateDog from './Components/CreateDog/CreateDog';

function App() {
  return (
    
      <div className="app">
       
        <Route exact path='/' render={ () => <LandingPage />}/>
        <Route exact path= "/home"> <Home/> </Route>
        <Route exact path= "/home/:id" render={({match})=> <Detail match={match} /> } />  
        <Route exact path= "/create" render={ () => <CreateDog/> } />
      </div>
    
  );
}

export default App;