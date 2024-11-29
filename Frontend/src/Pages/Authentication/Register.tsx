import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '@/Config/ApiConfig';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useLoading } from '@/Context/LoadingContext';
import Loader from '@/Components/Shared/Loader';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const { isLoading,setIsLoading } = useLoading()

  const register = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // registration logic
    if(!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill all fields ❌');
      return;
    }
    if(password !== confirmPassword) {
      toast.error('Passwords do not match ❌');
      return;
    }
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        { fullName, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      console.log(response)
      if (response.data.success) {
        toast.success('Registration successful!', { duration: 4000 })
        setIsLoading(false)
        navigate('/login')
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error.response?.data?.message || 'An error occurred, please try again later.', { duration: 4000 })
    }
    console.log('Registration attempted with:', { fullName, email, password, confirmPassword });
  };

  if(isLoading){
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register to BudgetMap
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={register}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500 hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
