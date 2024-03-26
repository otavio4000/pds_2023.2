import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from 'components/NavBar';
import theme from 'styles/themes/theme';
import Dashboard from 'pages/Dashboard';
import FazerDenuncia from 'pages/FazerDenuncia';
import Students from 'pages/Students';
import MyChildPage from 'pages/Dashboard/Pais/MyChildPage';
import AddStudent from 'pages/AddUser/AddStudent';
import AddPais from 'pages/AddUser/AddPais';
import GenerateToken from 'pages/GenerateToken';
import DenunciaPage from 'pages/Dashboard/Coordenação/DenunciaPage';
import MyChildDenunciaPage from 'pages/Dashboard/Pais/MyChildDenunciaPage';


function App() {


  return (


    <ChakraProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={
              <>
                <NavBar />
                <Routes>
                  <Route path="/" index element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/denuncia' element={<FazerDenuncia />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/dashboard/mychild/:id' element={<MyChildPage />} />
                  <Route path='/dashboard/mychild/:id/:denunciaId' element={<MyChildDenunciaPage />} />
                  <Route path='/dashboard/denuncia/:id' element={<DenunciaPage />} />
                  <Route path='/dashboard/students' element={<Students />} />
                  <Route path='/dashboard/students/add' element={<AddStudent />} />
                  <Route path='/dashboard/generate_token' element={<GenerateToken />} />
                  <Route path='/responsaveis/add' element={<AddPais />} />
                </Routes>
              </>
            } />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;



