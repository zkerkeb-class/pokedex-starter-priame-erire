import './Connec.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { conectUser } from '../../services/api';



//http://localhost:5173/pokemon/67f3f72d1b032d324bc33079
const  Connec = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Password length validation
    if (formData.password.length == 0) {
      setError("Le mot de passe ne doit être vide !");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Only send username and password (not confirmPassword)
      const userData = {
        username: formData.username,
        password: formData.password
      };
      
      // Await the result from createUser
      await conectUser(userData);
      
      setLoading(false);
      // Redirect to login page after successful registration
      navigate('/', { state: { message: 'Connexion validée.' } });
    } catch (err) {
      setLoading(false);
      setError(err.message || "Une erreur s'est produite lors de la connexion au compte");
    }
  };

    const connexion = () => {
        console.log("Me connecter ");
        navigate(`/`);
    };
    const createAccount = () => {
        console.log("Créer un compte finalement ");
        navigate(`/create_account/`);
    };
    return(
      <div className="create-user-container">
    <div className="form-card">
      <h2 className="form-title">Connexion à mon compte</h2>
     
      {error && <div className="error-message">{error}</div>}
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Entrez votre mot de passe"
          />
          </div>

       
        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter à mon compte'}
          </button>
        </div>
       
        <div className="form-footer">
          <p>Vous n'avez pas un compte? <span className="link" onClick={() => navigate('/create_account')}>Créez vous un compte</span></p>
        </div>
      </form>
    </div>
  </div>
)
};
export default Connec;