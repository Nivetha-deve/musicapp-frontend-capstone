import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userRegister } from "./api";

const RegisterForm = () => {

  const isLogged = Boolean(localStorage.getItem("token"))

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }

    if(!values.name){
      errors.name = "Required";
    }

    if(!values.password){
        errors.password = "Required";
      }

      if(!values.confirmPassword){
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.password) {
         errors.confirmPassword = "password is not matching"
      }

      if(!values.dob){
        errors.dob = "Required";
      }

      if(!values.gender){
        errors.gender = "Required";
      }

      return errors;
    };

      const formik = useFormik ({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
        dob: "",
        gender: ""
      },
      validate,
  onSubmit: async (values, { setSubmitting, resetForm }) => {
   // const { confirmPassword, ...userData } = values;
    try {
      const data = await userRegister(values);
      if (data.token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        resetForm();
      } else {
        console.log("Registration failed", data);
      }
    } catch (error) {
      console.log("Register error", error);
    } finally {
      setSubmitting(false);
    }
  },
});

  
  if(isLogged) {
    return <Navigate to={"/login"} />
  }

return(
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
              <label htmlFor="name" className='form-label'>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...formik.getFieldProps("name")}
                required 
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='text-danger'>{formik.errors.name}</div>
                )}
                </div>
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
                <div className="mb-3">
              <label htmlFor="confirmPassword" className='form-label'>ConfirmPassword</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                required 
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className='text-danger'>{formik.errors.confirmPassword}</div>
                )}
                </div>
                <div className="mb-3">
              <label htmlFor="dob" className='form-label'>DOB</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                {...formik.getFieldProps("dob")}
                required 
                />
                {formik.touched.dob && formik.errors.dob && (
                  <div className='text-danger'>{formik.errors.dob}</div>
                )}
                </div>
                <div className="mb-3">
              <label htmlFor="gender" className='form-label'>Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formik.values.gender === "male"}
                    onChange={() => formik.setFieldValue("gender", "male")}
                  />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={formik.values.gender === "female"}
                    onChange={() => formik.setFieldValue("gender", "female")}
                  />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    checked={formik.values.gender === "other"}
                    onChange={() => formik.setFieldValue("gender", "other")}
                  />
                  <label className="form-check-label" htmlFor="other">Other</label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger">{formik.errors.gender}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <Link to="/login" >Register</Link>  
        </form>
        </div>
        </div>
        </div>
);
};

export default RegisterForm;