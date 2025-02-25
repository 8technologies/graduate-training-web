import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon } from '@/components';
import { useAuthContext } from '@/auth';
import { useLayout } from '@/providers';
import { Alert } from '@/components';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  remember: Yup.boolean(),
});

const initialValues = {
  email: '',
  password: '',
  remember: false,
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  // For role-based redirection, ignore the "from" location.
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setStatus(null);

      try {
        if (!login) {
          throw new Error('JWTProvider is required for this form.');
        }

        // Assume login returns the user object with role_id
        const user = await login(values.email, values.password);

        if (values.remember) {
          localStorage.setItem('email', values.email);
        } else {
          localStorage.removeItem('email');
        }

        // Role-based redirection:
        if (user && user.role_id === 4) {
          navigate("/admin/dashboard", { replace: true });
        } else if (user && user.role_id === 3) {
          navigate("/alumni/dashboard", { replace: true });
        } else if (user && user.role_id === 2) {
          // Make sure this matches your routing setup (plural 'supervisors')
          navigate("/supervisor/dashboard", { replace: true });
        } else if (user && user.role_id === 1) {
          navigate("/student/dashboard", { replace: true });
        } else {
          // Fallback redirection if role is not recognized.
          navigate("/auth/login", { replace: true });
        }
      } catch (error) {
        setStatus(error.message || 'Invalid login credentials');
        setSubmitting(false);
      }

      setLoading(false);
    },
  });

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="card max-w-[390px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className="text-center mb-2.5">
          <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
            Sign in to 
            <h2>Graduate Training and Tracking System</h2>
          </h3>
          <div className="flex items-center justify-center font-medium">
            <span className="text-2sm text-gray-600 me-1.5">
              Need an account?
            </span>
            <Link
              to={
                currentLayout?.name === 'auth-branded'
                  ? '/auth/signup'
                  : '/auth/classic/signup'
              }
              className="text-2sm link"
            >
              Sign up
            </Link>
          </div>
        </div>

        {formik.status && <Alert variant="danger">{formik.status}</Alert>}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Email</label>
          <label className="input">
            <input
              placeholder="Enter email"
              autoComplete="off"
              {...formik.getFieldProps('email')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.email && formik.errors.email,
              })}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <label className="form-label text-gray-900">Password</label>
            <Link
              to={
                currentLayout?.name === 'auth-branded'
                  ? '/auth/reset-password'
                  : '/auth/classic/reset-password'
              }
              className="text-2sm link shrink-0"
            >
              Forgot Password?
            </Link>
          </div>
          <label className="input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              autoComplete="off"
              {...formik.getFieldProps('password')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.password && formik.errors.password,
              })}
            />
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon
                icon="eye"
                className={clsx('text-gray-500', { hidden: showPassword })}
              />
              <KeenIcon
                icon="eye-slash"
                className={clsx('text-gray-500', { hidden: !showPassword })}
              />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.password}
            </span>
          )}
        </div>

        <label className="checkbox-group">
          <input
            className="checkbox checkbox-sm"
            type="checkbox"
            {...formik.getFieldProps('remember')}
          />
          <span className="checkbox-label">Remember me</span>
        </label>

        <button
          type="submit"
          className="btn btn-success flex justify-center grow"
          disabled={loading || formik.isSubmitting}
        >
          {loading ? 'Please wait...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export { Login };
