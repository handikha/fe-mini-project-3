import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { login, forgetPassword } from "../../store/slices/auth/slices";
import { loginValidationSchema } from "../../store/slices/auth/validation";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => {
    return {
      role: state.auth.role,
    };
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [email, setEmail] = useState({ email: "" });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangeEmail = (e) => {
    setEmail({ email: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Validate the input using loginValidationSchema
    loginValidationSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
        dispatch(login(validatedValues))
          .then(() => {
            // Handle successful login, e.g., redirect to home page
          })
          .catch((error) => {
            // Handle login errors, e.g., show error message
            setErrors({ message: error.message }); // Set general error message
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

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleResetPassword = () => {
    dispatch(forgetPassword(email));
    setShowModal(false);
  };

  useEffect(() => {
    const element = document.documentElement;
    if (localStorage.theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, []);

  if (role === 1) {
    return <Navigate to='/admin/dashboard' replace />;
  }

  if (role === 2) {
    return <Navigate to='/cashier' replace />;
  }

  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-300 dark:bg-slate-800/50'>
      <div className='flex h-2/3 w-4/5 overflow-hidden rounded-xl shadow-md sm:w-1/2 lg:w-1/2'>
        <div className='relative hidden w-full overflow-hidden bg-primary lg:block'>
          <img
            src='https://source.unsplash.com/400x600?food'
            className='h-full w-full object-cover'
            alt=''
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white'>
            <h4 className='text-2xl font-medium'>Welcome Back!</h4>
            <p className='mt-4 text-center'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              laboriosam.
            </p>
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center bg-slate-200 px-6 py-8 dark:bg-slate-800'>
          <h3 className='mb-4 text-center text-xl font-bold tracking-tight'>
            Login
          </h3>

          <form
            className='flex w-full flex-col gap-2 text-sm'
            onSubmit={handleSubmit}
          >
            <Input
              required
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <span>{errors.username}</span>}

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

            <Button
              isButton
              isPrimary
              title='Login'
              className=' mt-4 w-full select-none shadow-md'
              // onClick={handleSubmit}
              type='submit'
            />

            <Button
              title='Forgot Password'
              className='h-4 cursor-pointer text-sm font-medium text-primary  hover:underline'
              onClick={handleShowModal}
            />
          </form>
        </div>
      </div>

      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title='Forgot Password'
      >
        <div className=''>
          <Input
            type='email'
            placeholder='Insert your email'
            id='email'
            name='email'
            value={email.email}
            onChange={handleChangeEmail}
            autoFocus
          />

          <Button
            isButton
            isPrimary
            isBLock
            className='mt-4'
            title='Reset Password'
            onClick={() => handleResetPassword()}
          />
        </div>
      </Modal>
    </div>
  );
}
