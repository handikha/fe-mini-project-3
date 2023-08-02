import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { changePassword, verifyAccount } from "../../store/slices/auth/slices";
import { changePasswordSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [verifyAccountToken, setVerifyAccountToken] = useState();

  useEffect(() => {
    setVerifyAccountToken(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Validate the input using changePasswordSchema
    changePasswordSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
        localStorage.setItem("token", verifyAccountToken);
        dispatch(verifyAccount());
        dispatch(changePassword(validatedValues))
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
      <div className='flex h-2/3 w-4/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/2'>
        <div className='relative hidden w-full overflow-hidden bg-primary lg:block'>
          <img
            src='https://source.unsplash.com/400x600?food'
            className='h-full w-full object-cover'
            alt=''
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white'>
            <h4 className='text-2xl font-medium'>Welcome to Tokopaedi!</h4>
            <p className='mt-4 text-center'>
              For security purposes, you have to change your password. Remember
              to choose a strong, unique password to ensure the safety of your
              account.
            </p>
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8'>
          <h3 className='text-dark mb-4 text-center text-xl font-bold tracking-tight'>
            Change Password
          </h3>

          <form
            className='flex w-full flex-col gap-2 text-sm'
            onSubmit={handleSubmit}
          >
            <Input
              required
              type='password'
              id='currentPassword'
              name='currentPassword'
              placeholder='Current password'
              value={values.currentPassword}
              onChange={handleChange}
            />
            {errors.currentpassword && <span>{errors.currentpassword}</span>}

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
              placeholder='Confirm Password'
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

            <Button
              isButton
              isPrimary
              title='Change Password'
              className=' mt-4 w-full select-none shadow-md'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
