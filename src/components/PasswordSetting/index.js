import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { changePassword } from "../../store/slices/auth/slices";
import { changePasswordSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";

export default function PasswordSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    setErrors({}); // Reset errors

    // Validate the input using changePasswordSchema
    changePasswordSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
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
          .finally(() => {
            setIsSubmitting(false);
          });
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
        setIsSubmitting(false);
      });
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <Input
        placeholder='Current Password'
        id='currentPassword'
        name='currentPassword'
        type='password'
        value={values.currentPassword}
        onChange={handleChange}
      />
      <Input
        placeholder='New Password'
        id='password'
        name='password'
        type='password'
        value={values.password}
        onChange={handleChange}
      />
      <Input
        placeholder='Confirm Password'
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        value={values.confirmPassword}
        onChange={handleChange}
      />
      <Button
        title='Change Password'
        isButton
        isPrimary
        isBLock
        className='mt-1'
        type='submit'
      />
    </form>
  );
}
