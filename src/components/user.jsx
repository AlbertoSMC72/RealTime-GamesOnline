import  { useState } from 'react';
import './css/user.css';

function User() {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSaveClick = () => {
    localStorage.setItem('username', username);
  };

  return (
    <div className="user-container">
      <label htmlFor="username">Ingrese su nombre de usuario:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleInputChange}
        className="username-input"
      />
      <button onClick={handleSaveClick} className="save-button">
        Guardar
      </button>
    </div>
  );
}

export default User;
