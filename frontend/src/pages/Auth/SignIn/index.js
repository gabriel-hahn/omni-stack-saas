import React from 'react';

import Button from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

const SignIn = () => (
  <Container>
    <SignForm onSubmit={() => {}}>
      <h1>Welcome</h1>

      <span>E-MAIL</span>
      <input type="email" name="email" />

      <span>PASSWORD</span>
      <input type="password" name="password" />

      <Button size="big" type="submit">Sign In</Button>
    </SignForm>
  </Container>
);

export default SignIn;
