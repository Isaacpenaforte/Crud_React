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
import useAuth from './useAuth';
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
  
export default function Cadastro (){
   
   const {cadastro} = useAuth()
   const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [emailCon,setEmailCon] = useState("")
    const [senha,setSenha] = useState("")


   const handleCadastro = () =>{
    if(!email | !emailCon | !senha){
        alert("Preencha todos os campos")
        return
    }else if (email !== emailCon){
        alert("Os email não estao iguais")
        return
    }

    const res = cadastro(email,senha)
    if(res){
        alert(res)
        return
    }
    alert("Usuario cadastrado com sucesso")
    navigate("/")
   }
   
   
   
    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
    
                  <h2 className="fw-bold mb-2 text-uppercase">Página de Cadastro</h2>
    <br></br>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Digite seu email' value={email} onChange={(e) => [setEmail(e.target.value)]} id='formControlLg' type='email' size="lg"/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Confirme seu email' value={emailCon} onChange={(e) => [setEmailCon(e.target.value)]} id='formControlLg' type='email' size="lg"/>

                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Crie sua senha' value={senha} onChange={(e) =>[setSenha(e.target.value)]} id='formControlLg' type='password' size="lg"/>
    
                  <button type="button" onClick={handleCadastro} className="btn btn-light">Cadastrar</button>
    
                  <div className='d-flex flex-row mt-3 mb-5'>
                    <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                      <MDBIcon fab icon='facebook-f' size="lg"/>
                    </MDBBtn>
    
                    <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                      <MDBIcon fab icon='twitter' size="lg"/>
                    </MDBBtn>
    
                    <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                      <MDBIcon fab icon='google' size="lg"/>
                    </MDBBtn>
                  </div>
    
                  <div>
                    <p className="mb-0">Ja possui uma conta? <a href="#!" className="text-white-50 fw-bold"></a><Link to="/">Home</Link></p>
    
                  </div>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
}