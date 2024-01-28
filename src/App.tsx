import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from 'components/NavBar';
import theme from 'styles/themes/theme';
import { useEffect } from 'react';
import Dashboard from 'pages/Dashboard';
import FazerDenuncia from 'pages/FazerDenuncia';

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

export default App;
