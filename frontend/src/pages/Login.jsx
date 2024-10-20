import React from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  
  

  return (
    <LoginForm url="api/login/" navigated="/" />
  )
}

export default Login
