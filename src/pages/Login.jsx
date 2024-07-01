import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { userLogin } from './api';
import { useDispatch } from 'react-redux';
import { setUser } from './store/reducer/UserRedux';
import "../App"

const LoginForm = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = Boolean(localStorage.getItem("token"))


  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
   validate,
   onSubmit: async (values, { setSubmitting,resetForm }) => {
    try{
      const data = await userLogin(values);
      dispatch(setUser(data));
      resetForm();
      navigate("/");
    } catch (error) {
      console.log("Login error",error)
    } finally{
      setSubmitting(false);
    }
  },
});

   if(isLogged) {
    <Navigate to={"/"} />
   }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email"
              className="form-control"
              id="email"
              {...formik.getFieldProps("email")}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
              <label htmlFor="password" className='form-label'>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...formik.getFieldProps("password")}
                required 
                />
                {formik.touched.password && formik.errors.password && (
                  <div className='text-danger'>{formik.errors.password}</div>
                )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Login</button>
            <Link to="/register" className='btn-login' style={{margin: 20, fontSize: 20}} >Register</Link>
          </form>
          </div>
          </div>
          </div>
  );
};
export default LoginForm;