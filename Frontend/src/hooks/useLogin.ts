//custom Hook for Login in the user
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../Context/LoadingContext'
import API_BASE_URL from '@/Config/ApiConfig'
import { useAuth } from '@/Context/AuthContext'

const useLogin = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { setIsLoading } = useLoading()
    const { setIsAuthenticated } = useAuth()
    const navigate = useNavigate();

    const login = async () => {
        setIsLoading(true)

        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )
            console.log(response)

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Login successful!', { duration: 4000 })
                setIsAuthenticated(true);
                navigate('/home')
            }
        } catch (error: any) {
            setIsLoading(false)
            toast.error(error.response?.data?.message || 'Network error. Please try again later.', { duration: 4000 })
        }
    }

    return { email, setEmail, password, setPassword, login }
}

export default useLogin
