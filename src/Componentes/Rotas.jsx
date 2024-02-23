import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Principal from "./Principal";
import useAuth from '../AutenticacaoDeLogin/useAuth';


export default function Rotas(){

    const Privado = ({Item}) =>{
        const {cadastrado} = useAuth()
        return cadastrado > 0 ? <Item></Item> : <Login></Login>
    }

    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/Cadastro" element={<Cadastro></Cadastro>}></Route>
                    <Route exact path="/Login" element={<Login></Login>}></Route>
                    <Route exact path="/Principal" element={<Privado Item={Principal}></Privado>}></Route>
                    <Route exact path="*" element={<Login></Login>}></Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
