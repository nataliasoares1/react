import CadastroPage from "./Pages/CadastroPage"
import Homepage from "./Pages/Homepage"
import Dashboard from "./Pages/Homepage"
import LoginPage from "./Pages/LoginPage"
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/cadastro" element={<CadastroPage/>} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
