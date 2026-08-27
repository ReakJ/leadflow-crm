import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast";

import { useAuth } from "../../context/useAuth"

import { loginSchema } from "../../schemas/authSchemas";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  
  const { 
    register, 
    handleSubmit,
    formState: { 
      errors,
      isSubmitting,
    }, 
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  
  async function onSubmit(data) {
    try {
      await login(data);
      
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Unable to sign in.";

      toast.error(message);
    }
  }

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content'>
        <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
          <div className='card-body'>
            <div className='text-center mb-6'>
              <div className="flex justify-center mb-3">
                <img
                  src="/leadora-logo.png"
                  alt="Leadora"
                  className="h-15 w-15 object-contain"
                />
              </div>
              <p className='text-xs uppercase tracking-widest text-base-content/60'>
                Leadora CRM
              </p>
              <h1 className='text-3xl font-bold mt-2'>
                Welcome back
              </h1>
              <p className='text-base-content/70 mt-2'>
                Sign in to continue.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)} 
              className='space-y-6'
            >
              <div>
                <label htmlFor="email" className='label pb-1'>
                  <span className="label-text">
                    Email
                  </span>
                </label>

                <input 
                  placeholder="Enter your email" 
                  id='email' 
                  type='email' 
                  autoComplete="email" 
                  className='input input-bordered w-full' 
                  {...register("email")} 
                />     
              
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className='label pb-1'>
                  <span className="label-text">
                    Password
                  </span>
                </label>

                <div className="relative">
                  <input 
                    placeholder="Enter your password" 
                    id='password' 
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password" 
                    className='input input-bordered w-full' 
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                      <Eye className="size-5 text-base-content/40"/>
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                className='btn btn-primary w-full'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"/>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage