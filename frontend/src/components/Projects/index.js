import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';

import { Container, Project } from './styles';

class Projects extends Component {
  state = {
    newProject: '',
  };

  componentDidMount() {
    const { activeTeam, getProjectsRequest } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreateProject = (e) => {
    e.preventDefault();

    const { createProjectRequest } = this.props;
    const { newProject } = this.state;

    createProjectRequest(newProject);
  }

  render() {
    const { activeTeam, toggleProjectModal, projects } = this.props;
    const { newProject } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Button onClick={toggleProjectModal}>+ New</Button>
            <Button onClick={() => { }}>Members</Button>
          </div>
        </header>

        {projects.data.map((project) => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Create new project</h1>

            <form onSubmit={this.handleCreateProject}>
              <span>Name</span>
              <input name="newProject" value={newProject} onChange={this.handleInputChange} />

              <Button size="big" type="submit">
                Save
              </Button>
              <Button onClick={toggleProjectModal} size="small" color="grey">
                Cancel
              </Button>
            </form>
          </Modal>
        )}
      </Container>
    );
  }
}

Projects.propTypes = {
  getProjectsRequest: PropTypes.func.isRequired,
  toggleProjectModal: PropTypes.func.isRequired,
  createProjectRequest: PropTypes.func.isRequired,
  projects: PropTypes.shape({
    projectModalOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })).isRequired,
  }).isRequired,
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
