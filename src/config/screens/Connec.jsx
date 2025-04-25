import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connectUser } from '../../services/api'; 
import './Connec.css';

const Connec = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await connectUser(formData);
      console.log('Login successful:', response);
      
      setLoading(false);
      
      // Redirect to home page or previous attempted page
      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Erreur de connexion. Vérifiez vos identifiants.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="connection-container">
      <div className="form-card">
        <h2 className="form-title">Connexion</h2>
        
        {location.state?.message && (
          <div className="success-message">{location.state.message}</div>
        )}
        
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
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
          
          <div className="form-footer">
            <p>Pas encore de compte? <span className="link" onClick={() => navigate('/create_account')}>Créer un compte</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Connec;