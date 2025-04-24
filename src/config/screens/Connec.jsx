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




// s'inspirer du code précédent

/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/api';
import './Cruser.css';

const Cruser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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
   
    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
   
    // Password length validation
    if (formData.password.length < 12) {
      setError("Le mot de passe doit contenir au moins 12 caractères");
      return;
    }

    // Uppercase validation
    if (!/[A-Z]/.test(formData.password)) {
      setError("Le mot de passe doit contenir au moins une lettre majuscule");
      return;
    }

    // Lowercase validation
    if (!/[a-z]/.test(formData.password)) {
      setError("Le mot de passe doit contenir au moins une lettre minuscule");
      return;
    }

    // Number validation
    if (!/[0-9]/.test(formData.password)) {
      setError("Le mot de passe doit contenir au moins un chiffre");
      return;
    }

    // Special character validation
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      setError("Le mot de passe doit contenir au moins un caractère spécial");
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
      await createUser(userData);
      
      setLoading(false);
      // Redirect to login page after successful registration
      navigate('/connection', { state: { message: 'Compte créé avec succès. Veuillez vous connecter.' } });
    } catch (err) {
      setLoading(false);
      setError(err.message || "Une erreur s'est produite lors de la création du compte");
    }
  };

  return (
    <div className="create-user-container">
      <div className="form-card">
        <h2 className="form-title">Créer un compte</h2>
       
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
            <div className="password-requirements">
              <small>Le mot de passe doit contenir au moins:</small>
              <ul>
                <li>12 caractères</li>
                <li>Une lettre majuscule</li>
                <li>Une lettre minuscule</li>
                <li>Un chiffre</li>
                <li>Un caractère spécial</li>
              </ul>
            </div>
          </div>
         
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirmez votre mot de passe"
            />
          </div>
         
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </div>
         
          <div className="form-footer">
            <p>Vous avez déjà un compte? <span className="link" onClick={() => navigate('/connection')}>Connectez-vous</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cruser;
*/