import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from 'components/NavBar';
import theme from 'styles/themes/theme';
import { useEffect, useState } from 'react';
import Dashboard from 'pages/Dashboard';
import FazerDenuncia from 'pages/FazerDenuncia';
import axios from 'axios';



export type Title = {
  matricula: number;
  relato : string;
  id: number;
  body: string;
  title: string;

};

function App() {
  

  return (

    
    <ChakraProvider theme={theme}> 
      <div className="App">
        
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/> 
          <Route path='/*' element={
            <>
              <NavBar />
              <Routes>
                <Route path="/" index element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/denuncia' element={<FazerDenuncia />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
              </Routes>
            </>
          }/> 
        </Routes>
      </Router>
      </div>
    </ChakraProvider>
  );
}



// function App() {
  // const [titles, setTitles] = useState<Title[] | null>()
  // useEffect(()=> {
  //   const url = 'https://backendd-vk3y.onrender.com/';
    
    
  //   axios.get(url).then((response)=> {
  //     setTitles(response.data);
  //   });
  // },[]);

  // return <div className="App">
  //   { titles ? titles.map((title) =>{
  //     return <p>{title.relato}</p>
  //   }) :null}
  // </div>
  // ;
// }

export default App;



