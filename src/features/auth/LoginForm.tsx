import { Button, Divider, Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { closeModal } from "../../app/common/modals/modalSlice";
import { auth } from '../../app/config/firebase';
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const { data: location } = useAppSelector(state => state.modal);
  const { register, handleSubmit, setError, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
    mode: "onTouched"
  });
  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(closeModal());
      navigate(location.from);
    } catch (err: any) {
      setError('root.severError', {
        type: '400', message: err.message
      });
    }
  }

  return (
    <ModalWrapper header='Sign into re-vents' size="mini">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          defaultValue=''
          placeholder='Email address'
          {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/ })}
          error={
            errors.email?.type === 'required' && "Email is required" ||
            errors.email?.type === 'pattern' && 'Email is invalid'
          }
        />
        <Form.Input
          type='password'
          defaultValue=''
          placeholder='password'
          {...register('password', { required: true })}
          error={errors.password && 'Password is required'}
        />
        {errors.root && (
          <Label
            basic
            color='red'
            style={{ display: 'block', marginBottom: 10 }}
            content={errors.root.severError.message}
          />
        )}
        <Button loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type='submit'
          fluid
          size='large'
          color='teal'
          content='Login'
        />
        <Divider />
        <SocialLogin />
      </Form>
    </ModalWrapper>
  );
}