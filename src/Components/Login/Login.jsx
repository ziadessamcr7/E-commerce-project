import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/Authentication";

export default function Login() {
  let user = {
    email: "ziadessamcr7@gmail.com",
    password: "Zizo1234!"
  };

  const [errorMsg, setErrorMsg] = useState(null);

  const [success, setSuccess] = useState(null);

  const [Loading, setLoading] = useState(false);

  const { setToken } = useContext(authContext);

  const { setName } = useContext(authContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tkn") !== null) {
      navigate("/home");
    }
  }, [])




  async function userLogin(vals) {
    console.log("sending to backend...");
    setLoading(true);

    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, vals)
      .catch(function (err) {
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);

        setLoading(false);
      });

    console.log(data);
    // console.log('kolo taamaaam')

    if ((data.message = "success")) {
      // console.log( data.token )
      setToken(data.token);
      localStorage.setItem("tkn", data.token);
      setName(data.user.name);
      localStorage.setItem('name', data.user.name)  // ana eli 3amelha


      setSuccess("Welcome back :)");

      setTimeout(() => {
        navigate("/home");
      }, 100);
    }



    // setLoading(false)
  }

  let formik = useFormik({
    initialValues: user,

    onSubmit: userLogin,


    validate: function (values) {
      setErrorMsg(null);
      setSuccess(null);

      let errors = {};

      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "please make sure u enter @ and .";
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "please enter valid password between 6 & 12 chars";
      }

      return errors;
    },
  });


  return (
    <section id="login" className="background">
      {errorMsg ? (
        <div className=" w-50 m-auto my-2 alert alert-danger"> {errorMsg} </div>
      ) : (
        ""
      )}

      {success ? (
        <div className=" w-50 m-auto my-2 alert alert-success"> {success} </div>
      ) : (
        ""
      )}

      <h1 className="text-center text-white">Login Now </h1>

      <form className="w-50 bg-success-subtle p-4 rounded-4 text-dark m-auto" onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="" >Email:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          defaultValue={'zoz@mail.com'}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : (
          ""
        )}

        <label htmlFor="pass" className="">Password:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          className="form-control mb-3"
          id="password"
          name="password"
          defaultValue={'123456'}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger">{formik.errors.password}</div>
        ) : (
          ""
        )}

        <h6> <Link className="" to={'/forgetpassword'}> Forgot Password? </Link> </h6>

        <button type="submit" className="btn d-flex justify-content-center btn-success px-4 mt-3 ms-auto">
          {Loading === false ? (
            <span className="fw-bold">Login</span>
          ) : (
            <TailSpin
              height="30"
              width="30"
              color="#ffff"
              ariaLabel="tail-spin-loading"
              radius="3"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </button>
      </form>
    </section>
  );
}
