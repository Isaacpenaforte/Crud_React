import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import useAuth from '../AutenticacaoDeLogin/useAuth';
import { useNavigate,Link } from 'react-router-dom';

function Login() {

    const {login} = useAuth()
    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")

    const handleLogin = () =>{
        if(!email | !senha){
            alert("Preencha todos os campos")
            return
        }

        const res = login(email,senha)
        if(res){
            alert(res)
            return
        }
        navigate("/Principal")
    }



  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Página de Login</h2>
<br></br>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Digite seu email' value={email} onChange={(e) => [setEmail(e.target.value)]} id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Digite sua senha' value={senha} onChange={(e) =>[setSenha(e.target.value)]} id='formControlLg' type='password' size="lg"/>

              <button type="button" onClick={handleLogin} className="btn btn-light">Entrar</button>

<br></br>
              <div>
                <p className="mb-0">Não possui uma conta? <a href="#!" className="text-white-50 fw-bold"></a><Link to="/Cadastro">Registre-se</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
