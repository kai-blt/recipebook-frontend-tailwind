import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../state/ducks';


const LoginForm = (props) => {  
  const [formValues, setFormValues] = useState({username: '', email: '', password: ''});
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const { push } = useHistory();
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);

  useEffect(() => {
    if (status === 'login/success') {
      push('/recipes');
    }
  }, [status, error, push]);

  const handleInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const signIn = (e) => {
    e.preventDefault();
    const { username, password } = formValues;
    dispatch(userActions.login(username, password));
  };

  const signUp = (e) => {
    e.preventDefault();    
    dispatch(userActions.signup(formValues));
    setIsCreatingAccount(!isCreatingAccount);
  };

  return (
    <>
    {!isCreatingAccount
      ?
      <>
        <form onSubmit={signIn}>
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInput}
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInput}
            className="input"
          />
          <button className="button">Sign In</button>          
        </form>
        <span onClick={() => setIsCreatingAccount(!isCreatingAccount)} className="link">Don't have an account? Sign Up!</span>
        {status === "login/pending"
          ? 
            <svg className="animate-spin h-5 w-5 mt-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          : null
        }
      </>
      :
      <>
        <form onSubmit={signUp}>
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInput}
            className="input"
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInput}
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInput}
            className="input"
          />
          <button className="button">Sign Up</button>
        </form>
        {status === "signup/pending"
          ? 
            <svg className="animate-spin h-5 w-5 mt-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          : null
        }
      </>
    }      
    </>
  );
}

export default LoginForm;