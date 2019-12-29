import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';

import Button from '~/styles/components/Button';

import { Container, Project } from './styles';

class Projects extends Component {
  componentDidMount() {
    const { activeTeam, getProjectsRequest } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  render() {
    const { activeTeam, projects } = this.props;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Button onClick={() => { }}>+ New</Button>
            <Button onClick={() => { }}>Members</Button>
          </div>
        </header>

        {projects.data.map((project) => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}
      </Container>
    );
  }
}

Projects.propTypes = {
  getProjectsRequest: PropTypes.func.isRequired,
  activeTeam: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(ProjectsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
