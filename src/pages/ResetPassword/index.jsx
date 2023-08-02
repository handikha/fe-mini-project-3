import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { verifyAccount, resetPassword } from "../../store/slices/auth/slices";
import { resetPasswordSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [verifyAccountToken, setVerifyAccountToken] = useState();

  useEffect(() => {
    setVerifyAccountToken(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Validate the input using resetPasswordSchema
    resetPasswordSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
        localStorage.setItem("token", verifyAccountToken);
        dispatch(verifyAccount());
        dispatch(resetPassword(validatedValues))
          .then(() => {
            localStorage.removeItem("token");
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 500);
          })
          .catch((error) => {
            setErrors({ message: error.message });
          })
          .finally(() => {});
      })
      .catch((validationErrors) => {
        // If validation fails, set the error messages in the state separately
        const errorMessages = validationErrors.inner.reduce(
          (acc, currentError) => {
            acc[currentError.path] = currentError.message;
            return acc;
          },
          {}
        );
        setErrors(errorMessages);
      });
  };

  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-300/60'>
      <div className='flex h-1/3 w-2/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/2'>
        <div className='flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8'>
          <h3 className='text-dark mb-4 text-center text-xl font-bold tracking-tight'>
            Reset Password
          </h3>

          <form
            className='flex w-full flex-col gap-2 text-sm'
            onSubmit={handleSubmit}
          >
            <Input
              required
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}

            <Input
              required
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm password'
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

            <Button
              isButton
              isPrimary
              title='Reset Password'
              className=' mt-4 w-full select-none shadow-md'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
