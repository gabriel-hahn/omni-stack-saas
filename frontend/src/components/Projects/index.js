import React from 'react';

import Button from '~/styles/components/Button';

import { Container, Project } from './styles';

const Projects = () => (
  <Container>
    <header>
      <h1>Gabriel Project</h1>
      <div>
        <Button onClick={() => { }}>+ New</Button>
        <Button onClick={() => { }}>Members</Button>
      </div>
    </header>

    <Project>
      <p>Project example</p>
    </Project>

    <Project>
      <p>Project example</p>
    </Project>

    <Project>
      <p>Project example</p>
    </Project>
  </Container>
);

export default Projects;
