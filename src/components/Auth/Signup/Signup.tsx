// src/components/Auth/Signup/Signup.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmailSignup, validatePassword, validatePhoneNumberSignUp } from '../../../utils/validation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields
    switch (name) {
      case 'email':
        setErrors({ ...errors, email: validateEmailSignup(value) ? '' : 'Invalid email format' });
        break;
      case 'password':
        setErrors({ ...errors, password: validatePassword(value) ? '' : 'Password must have at least 8 characters, one letter, and one number' });
        break;
      case 'firstName':
        setErrors({ ...errors, firstName: value ? '' : 'First name is required' });
        break;
      case 'lastName':
        setErrors({ ...errors, lastName: value ? '' : 'Last name is required' });
        break;
      case 'phoneNumber':
        setErrors({ ...errors, phoneNumber: validatePhoneNumberSignUp(value) ? '' : 'Phone number must be 10 digits' });
        break;
      case 'address':
        setErrors({ ...errors, address: value ? '' : 'Address is required' });
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (
      formData.username &&
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.address &&
      !errors.email &&
      !errors.password &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.phoneNumber &&
      !errors.address
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error('Please fill all fields correctly');
      return;
    }

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Sucessful SignUp")
        navigate('/login');
        
        
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-black rounded-full h-12 w-12"></div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-2">Sign Up</h2>
        <p className="text-center text-gray-500 mb-6">Welcome to smart investment</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Email"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Password"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="First Name"
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Last Name"
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Address"
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
          </div>
          <button type="submit" disabled={!isFormValid()} className="bg-black text-white rounded-lg px-4 py-2 w-full">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already Registered? <a href="/login" className="text-black font-bold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
