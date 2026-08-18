import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom"

import { createUser } from '../../services/userService';
import { createUserSchema } from "../../schemas/userSchemas"  
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';

const AddUserPage = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "member",
    },
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  
  async function onSubmit(data) {
    try {
      await createUser(data);

      toast.success("User created successfully.");

      navigate("/users");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "Failed to create user. Please try again."

      toast.error(message);
    }
  }

  return (
    <div className='space-y-6'>
      
      {/* Header */}
      <div className='flex items-center gap-3'>
        <Link
          to="/users"
          className="btn btn-ghost btn-sm"
        >
          ←
        </Link>

        <div>
          <h1 className='text-2xl font-bold'>
            Add User
          </h1>

          <p className='text-sm text-base-content/60 mt-1'>
            Create a new user account and assign their CRM role.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='card bg-base-100 border border-base-300'>
        <div className='card-body'>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6'
          >
            
            {/* Name */}
            <div>
              <label htmlFor="name" className='label'>
                <span className='label-text'>
                  Name
                </span>
              </label>

              <input 
                id="name"
                type="text"
                placeholder="Enter full name"
                autoComplete="name"
                className="input input-bordered w-full"
                {...register("name")}
              />

              {errors.name && (
                <p className='text-error text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>


            {/* Email */}
            <div>
              <label htmlFor="email" className='label'>
                <span className='label-text'>
                  Email
                </span>
              </label>

              <input 
                id='email'
                type='email'
                placeholder='Enter email address'
                autoComplete='email'
                className='input input-bordered w-full'
                {...register("email")}
              />

              {errors.email && (
                <p className='text-error text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>


            {/* Password */}
            <div>
              <label htmlFor="password" className='label'>
                <span className='label-text'>
                  Password
                </span>
              </label>

              <input 
                id='password'
                type='password'
                placeholder='Create a password'
                autoComplete='new-password'
                className='input input-bordered w-full'
                {...register("password")}
              />

              {errors.password && (
                <p className='text-error text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className='label'>
                <span className='label-text'>
                  Role
                </span>
              </label>

              <select 
                id='role'
                className='select select-bordered w-full'
                {...register("role")}
              >
                <option value="member">
                  Member
                </option>

                {user?.role === "admin" && (
                  <option value="manager">
                    Manager
                  </option>
                )}
              </select>

              {errors.role && (
                <p className='text-error text-sm mt-1'>
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className='flex justify-end gap-3 pt-2'>

              <Link
                to="/users"
                className='btn btn-ghost'
              >
                Cancel
              </Link>

              <button
                type='submit'
                className='btn btn-primary'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className='loading loading-spinner loading-sm'/>
                    Creating...
                  </>
                ) : (
                  "Create User"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default AddUserPage