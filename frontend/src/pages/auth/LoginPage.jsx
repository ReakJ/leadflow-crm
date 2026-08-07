import { ChartNoAxesColumn } from "lucide-react";
import React from 'react'

const LoginPage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content'>
        <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
          <div className='card-body'>
            <div className='text-center mb-6'>
              <div className="flex justify-center mb-3">
                <ChartNoAxesColumn
                    className="text-primary"
                    size={36}
                />
              </div>
              <p className='text-xs uppercase tracking-widest text-base-content/60'>
                LeadFlow CRM
              </p>
              <h1 className='text-3xl font-bold mt-2'>
                Welcome back
              </h1>
              <p className='text-base-content/70 mt-2'>
                Sign in to continue.
              </p>
            </div>
            <form className='space-y-6'>
              <div>
                <label htmlFor="email" className='label'>
                  <span className="label-text">
                    Email
                  </span>
                </label>
                <input placeholder="Enter your email" id='email' type='email' autoComplete="email" className='input input-bordered w-full'/>     
              </div>
              <div>
                <label htmlFor="password" className='label'>
                  <span className="label-text">
                    Password
                  </span>
                </label>
                <input placeholder="Enter your password" id='password' type='password' autoComplete="current-password" className='input input-bordered w-full'/>
              </div>
              <button type="submit" className='btn btn-primary w-full'>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage