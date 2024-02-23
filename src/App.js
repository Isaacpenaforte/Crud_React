import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Rotas from '../src/Componentes/Rotas';
import { AuthProvider } from "./AutenticacaoDeLogin/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Rotas></Rotas>
      </AuthProvider>
       
    </div>
  );
}

export default App;
