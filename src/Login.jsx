import { useState } from "react";
import './App.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Configura Firebase
const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetta eventuali errori precedenti
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Se il login è riuscito, naviga alla pagina principale
      navigate("/aggiungi-prodotto");
    } catch (err) {
      setError("Errore di login: " + err.message); // Mostra un messaggio di errore
    }
  };

  return (
    <div id="contenitoreLogin" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
