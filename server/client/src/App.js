import './App.css';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import HashLoader

 from "react-spinners/HashLoader";
import {
  css
} from "@emotion/core";
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { initialState,reducer } from './reducer/userReducer';
import Createpost from './pages/Createpost';
import Profile from './pages/Profile';
import Input from './crud/Input';
import Get from './crud/Get';
import Update from './crud/Update';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem("user"))
    console.log((user))
    if(user){
      dispatch({type: "USER", payload: user})
    }
    if(!user){
      history.push('/login')
    }

  },[])

  return(
    <Switch>
    <Route path='/' exact>
      <Home/>
    </Route>
    <Route path='/login' exact>
      <Login/>
    </Route>
    <Route path='/register' exact>
      <Register/>
    </Route>
    <Route path='/create-post' exact>
      <Createpost/>
    </Route>
    <Route path='/profile' exact>
      <Profile/>
    </Route>
  </Switch>
  )

}


function App() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("orange");

  const [state, dispatch] = useReducer(reducer, initialState)

  

  //TODO: This is for spinner

  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 2000)
  // }, [])

  return (

    <div className = {loading ? "App" : '' }  > {
      loading ?
      <HashLoader

 color = {
        color
      }
      loading = {
        loading
      }
      size = {
        40
      }
      css={override}
      />:
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/input">
        <Input/>
        </Route>
        <Route exact path="/">
        <Home/>
        </Route>
        <Route exact path="/update/:postId">
        <Update/>
        </Route>
        <Route exact path="/get">
        <Get/>
        </Route>
      
      </Switch>
      
      {/* <Routing/> */}
    </BrowserRouter>
    </UserContext.Provider>
    }

    </div>
  );
}

export default App;