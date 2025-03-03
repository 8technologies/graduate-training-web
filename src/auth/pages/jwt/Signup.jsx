import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toAbsoluteUrl } from '@/utils';
import { Alert, KeenIcon } from '@/components';
import { useLayout } from '@/providers';

const API_URL = import.meta.env.VITE_APP_API_URL;

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  telephone: '',
  password: '',
  confirm_password: '',
  acceptTerms: false,
  role: '' // "Student" or "Alumni"
};

const signupSchema = Yup.object().shape({
  first_name: Yup.string().min(2, 'Minimum 2 characters').required('First name is required'),
  last_name: Yup.string().min(2, 'Minimum 2 characters').required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  telephone: Yup.string().length(10, 'Phone number must be 10 digits').required('Phone number is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('Confirm Password is required'),
  acceptTerms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  role: Yup.string().oneOf(['Student', 'Alumni'], 'Please select a role').required('Role is required')
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({}); // ✅ Store Laravel validation errors
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { currentLayout } = useLayout();

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setApiErrors({}); // Clear previous errors

      try {
        const role_id = values.role === 'Student' ? 1 : 3; // ✅ Assign role_id dynamically
        const university_id = 1; // ✅ Always assign university_id as 1

        const payload = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          telephone: values.telephone,
          password: values.password,
          password_confirmation: values.confirm_password, // ✅ Correct field name
          role_id,
          university_id
        };

        const response = await axios.post(`${API_URL}/register`, payload);

        if (response.data.message === 'User registered successfully') {
          navigate('/auth/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setApiErrors(error.response.data.errors); // ✅ Show validation errors dynamically
        } else {
          setStatus('Error: Unable to register user');
        }
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="card max-w-[370px] w-full">
      <form className="card-body flex flex-col gap-5 p-10" noValidate onSubmit={formik.handleSubmit}>
        <div className="text-center mb-2.5">
          <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">Sign up</h3>
          <div className="flex items-center justify-center font-medium">
            <span className="text-2sm text-gray-600 me-1.5">Already have an account?</span>
            <Link to={currentLayout?.name === 'auth-branded' ? '/auth/login' : '/auth/classic/login'} className="text-2sm link">
              Sign In
            </Link>
          </div>
        </div>

        {formik.status && <Alert variant="danger">{formik.status}</Alert>}

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">First Name</label>
          <input type="text" {...formik.getFieldProps('first_name')} className="input" placeholder="First Name" />
          {formik.touched.first_name && formik.errors.first_name && <span className="text-red-500 text-xs">{formik.errors.first_name}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Last Name</label>
          <input type="text" {...formik.getFieldProps('last_name')} className="input" placeholder="Last Name" />
          {formik.touched.last_name && formik.errors.last_name && <span className="text-red-500 text-xs">{formik.errors.last_name}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Email</label>
          <input type="email" {...formik.getFieldProps('email')} className="input" placeholder="Email Address" />
          {formik.touched.email && formik.errors.email && <span className="text-red-500 text-xs">{formik.errors.email}</span>}
          {apiErrors.email && <span className="text-red-500 text-xs">{apiErrors.email[0]}</span>} {/* ✅ Show API error */}
        </div>

        {/* Telephone */}
        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Phone Number</label>
          <input type="text" {...formik.getFieldProps('telephone')} className="input" placeholder="Phone Number" />
          {formik.touched.telephone && formik.errors.telephone && <span className="text-red-500 text-xs">{formik.errors.telephone}</span>}
        </div>

      

         {/* Password Field */}
         <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Password</label>
          <label className="input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              autoComplete="off"
              {...formik.getFieldProps('password')}
              className="form-control bg-transparent"
            />
            <button type="button" className="btn btn-icon" onClick={() => setShowPassword(!showPassword)}>
              <KeenIcon icon={showPassword ? "eye-slash" : "eye"} className="text-gray-500" />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && <span className="text-red-500 text-xs">{formik.errors.password}</span>}
          {apiErrors.password && <span className="text-red-500 text-xs">{apiErrors.password[0]}</span>} 
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Confirm Password</label>
          <label className="input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter Password"
              autoComplete="off"
              {...formik.getFieldProps('confirm_password')}
              className="form-control bg-transparent"
            />
            <button type="button" className="btn btn-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <KeenIcon icon={showConfirmPassword ? "eye-slash" : "eye"} className="text-gray-500" />
            </button>
          </label>
          {formik.touched.confirm_password && formik.errors.confirm_password && <span className="text-red-500 text-xs">{formik.errors.confirm_password}</span>}
          {apiErrors.password && <span className="text-red-500 text-xs">{apiErrors.password[0]}</span>} 
        </div>

        {/* Role Selection */}
        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Role</label>
          <div role="group" className="flex gap-3">
            <label className="inline-flex items-center">
              <input type="radio" name="role" value="Student" checked={formik.values.role === 'Student'} onChange={formik.handleChange} />
              <span className="ml-2">Student</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="role" value="Alumni" checked={formik.values.role === 'Alumni'} onChange={formik.handleChange} />
              <span className="ml-2">Alumni</span>
            </label>
          </div>
          {formik.touched.role && formik.errors.role && <span className="text-red-500 text-xs">{formik.errors.role}</span>}
        </div>

         {/* Accept Terms */}
         <label className="checkbox-group">
          <input type="checkbox" {...formik.getFieldProps('acceptTerms')} className="checkbox checkbox-sm" />
          <span className="checkbox-label">I accept <Link to="#" className="link">Terms & Conditions</Link></span>
        </label>

        <button type="submit" className="btn btn-success" disabled={loading || formik.isSubmitting}>
          {loading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export { Signup };
