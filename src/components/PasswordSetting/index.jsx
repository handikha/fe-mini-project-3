import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { changePassword } from "../../store/slices/auth/slices";
import { changePasswordSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";

export default function PasswordSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      changePasswordSchema.validateSync(values);
      dispatch(changePassword(values));
    } catch (error) {
      setErrors(error.errors);
    }
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
      {/* {errors.currentPassword && <span>{errors.currentPassword}</span>} */}
      <Input
        placeholder='New Password'
        id='password'
        name='password'
        type='password'
        value={values.password}
        onChange={handleChange}
      />
      {/* {errors.password && <span>{errors.password}</span>} */}
      <Input
        placeholder='Confirm Password'
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        value={values.confirmPassword}
        onChange={handleChange}
      />
      {errors && <span>{errors}</span>}
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
