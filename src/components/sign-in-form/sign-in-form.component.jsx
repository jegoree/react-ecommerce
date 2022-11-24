import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../context/user.contex';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

// Defining object structure
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // Initiating state for form handeling, and using defaultFormFields
  // in order to track user input.
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    setCurrentUser(user);
  };

  // Submit function that creates a new user.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetForm();
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        alert('Invalid email or password');
        return;
      } else {
        console.log(error.code);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
          }}
        />

        <FormInput
          label='Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password,
          }}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign in</Button>
          <Button type='button' onClick={signInWithGoogle} buttonType='google'>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
