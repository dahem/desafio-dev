import React from 'react';
import Button from '../../components/Button';
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithPopup } = useAuth0();

  return (
    <div className="fit center" style={{ flexDirection: 'column' }}>
      <h1>Bycoders Login</h1>
      <Button onClick={() => loginWithPopup()} label="Entrar" />
    </div>
  );
};

export default Login;
