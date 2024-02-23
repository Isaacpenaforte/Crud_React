import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


export default function Principal(){
    
    const [api,setApi] = useState([])
    const [id,setId] = useState()
    const [nome,setNome] = useState("")
    const [presenca,setPresenca] =useState("")
    const [numDeFaltas,setNumDeFaltas] = useState("")  
    
    useEffect(() =>{

        fetch("https://64345f001c5ed06c9595fd07.mockapi.io/api/cliente/alunos")
        .then((res) => res.json())
        .then((resultado) =>{
            setApi(resultado)
        })

    },[])

    function renderizarApi(){
        return(
            api.map((api) =>(
                <tr key={api.id}>
                    <td>{api.id}</td>
                    <td>{api.nome}</td>
                    <td>{api.presenca}</td>
                    <td>{api.numDeFaltas}</td>
                    <td><Button variant="danger" onClick={() => apagarApi(api.id)}>Excluir</Button>{' '}   </td>  
                    <td><Button variant="info" onClick={() => atualizarApi(api.id)}>Atualizar</Button>{' '}   </td>             
           
                    </tr>
            ))
        )
    }

    function renderizarHead(){
        return(
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Presença</th>
                <th>Nº de faltas</th>
                <th>Ações</th>
                <th>Ações</th>
            </tr>
        )
    }

    function apagarApi(id) {
        fetch("https://64345f001c5ed06c9595fd07.mockapi.io/api/cliente/alunos/" + id,{method:'DELETE'})
        .then(res =>{
            if(res.ok){
                setApi(prevstate => prevstate.filter(item => item.id !== id))
            }
        })
    }

    function atualizarApi(id){
        fetch("https://64345f001c5ed06c9595fd07.mockapi.io/api/cliente/alunos/" + id,{method:'GET'})
        .then((res) =>res.json())
        .then((resultado) =>{
            setId(resultado.id)
            setNome(resultado.nome)
            setPresenca(resultado.presenca)
            setNumDeFaltas(resultado.numDeFaltas)
        })
    }

    function cadastrarId(){
        const novoItem = {
            nome:nome,
            presenca:presenca,
            numDeFaltas:numDeFaltas
        }

        fetch("https://64345f001c5ed06c9595fd07.mockapi.io/api/cliente/alunos",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(novoItem)
        })

        .then((res) => res.json())
        .then((resultado) =>{
            setApi((prevstate) =>[...prevstate,resultado])
            setNome("")
            setPresenca("")
            setNumDeFaltas("")
        })

    }

    function atualizarId(){
        const novoItem ={
            id:id,
            nome:nome,
            presenca:presenca,
            numDeFaltas:numDeFaltas
        }

        fetch("https://64345f001c5ed06c9595fd07.mockapi.io/api/cliente/alunos/" +id,{
            method:'PUT',
            headers:{"Content-Type" :"application/json"},
            body:JSON.stringify(novoItem)
        })

        .then((res) => res.json())
        .then((resposta) =>{
            setApi((prevstate) => prevstate.map(item =>(item.id === id ?{...item,nome:nome,presenca:presenca,numDeFaltas:numDeFaltas}:item)))
            setNome("")
            setPresenca("")
            setId("")
            setNumDeFaltas("")
       
       
        })

    }

    function salvar (e){
        e.preventDefault()
        if(id === ""){
            cadastrarId()

        }else{atualizarId()
        }
    }

    function atualizaNome(e){
        setNome(e.target.value)
    }

    function atualizaPresenca(e){
        setPresenca(e.target.value)
    }

    function atualizaNumDeFaltas(e){
        setNumDeFaltas(e.target.value)
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>Página do Professor</h1>
            <br></br>
            <br></br>
       <Form>
      <Row>
        <Col>
          <Form.Control placeholder="ID" value={id} readOnly={true}/>
        </Col>
        <Col>
          <Form.Control placeholder="Nome" value={nome} onChange={atualizaNome}/>
        </Col>
        <Col>
          <Form.Control placeholder="Presença" value={presenca} onChange={atualizaPresenca}/>
        </Col>
        <Col>
          <Form.Control placeholder="Nº de Faltas" value={numDeFaltas} onChange={atualizaNumDeFaltas}/>
        </Col>
              </Row>
              <br></br>
              <br></br>
              <button type="submit" class="btn btn-light" onClick={salvar}>Salvar</button>

    </Form>
    <br></br>
    <br></br>
        <Table striped bordered hover size="sm">
          <thead>
           {renderizarHead()}
          </thead>
          <tbody>
           {renderizarApi()}
          </tbody>
        </Table>
        </div>
      );
}