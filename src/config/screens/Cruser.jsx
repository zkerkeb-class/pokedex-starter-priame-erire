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
   
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
   
    if (formData.password.length < 12) {
      setError("Le mot de passe doit contenir au moins 12 caractères");
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