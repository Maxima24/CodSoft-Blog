import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth } from './firebase.js';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './Contexts/LoginContext/Login.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // const { setUserdata } = useLogin();
  const navigate = useNavigate();
  const {setUserdata}= useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isLogin) {
        const response = await signInWithEmailAndPassword(auth, email,password);
        alert("Login successful");
      } else {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(response.user, {
          displayName: username,
       
      }
    )
      alert("User created successfully")}
      setUserdata({ email, password,username  });
      navigate('/home');
    } catch (error) {
      alert(error.message.split(":")[1] ?? error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white">
          {isLogin ? 'Login' : 'Create Account'}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300 shadow-md"
          >
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;