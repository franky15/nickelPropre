import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//importation des éléments de redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from './AuthSlice';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userStore = useSelector((state) => state.auth); //auth est le nom du reducer de la page auth

    console.log("userStore dans Login", userStore);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});

  // Fonction de validation des champs
  const validate = () => {
    const newErrors = {};

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email doit être valide';
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est obligatoire';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    
    // Retourne true si aucune erreur
    return Object.keys(newErrors).length === 0;
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {

        // Si le formulaire est valide, on soumet
        console.log(formData); // Cet objet sera transmis pour l'authentification
        //alert('Connexion réussie');

        // Appel de l'action login
        dispatch(login(formData))
            .then((action) => {

            console.log("Réponse de l'action login", action);

            if(action.payload.token){
                
                const token = userStore.token;
                
                console.log("Token dans le login", token);

                navigate("/");

            }else{

               console.log("***Erreur lors de la connexion");
            }
         

        });
    }
  };

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        
        {/* Champ Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <span className="invalid-feedback">{errors.email}</span>}
        </div>

        {/* Champ Mot de Passe */}
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <span className="invalid-feedback">{errors.password}</span>}
        </div>

        {/* Bouton Soumettre */}
        <button type="submit" className="btn btn-primary">Connexion</button>
      </form>
    </div>
  );
};

export default LoginPage;
