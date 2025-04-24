import './Connec.css';
import { useNavigate } from 'react-router';
console.log("SALUT JE VEUX ME CONNECRER");



//http://localhost:5173/pokemon/67f3f72d1b032d324bc33079
const  Connec = () => {
    const navigate = useNavigate();
    const connexion = () => {
        console.log("Me connecter ");
        navigate(`/`);
    };
    const createAccount = () => {
        console.log("Me connecter ");
        navigate(`/create_account/`);
    };
    return(
        <div>
            <button style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px', textAlign: 'center', width: '125px',height:'75px'}} 
                onClick={() => connexion()}
                >Connexion
            </button>
            <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', textAlign: 'center', width: '125px',height:'75px'}} 
                onClick={() => createAccount()}
                >New
            </button>
            <p>Poage de co</p>
            
        </div>
    )
}


export default Connec;