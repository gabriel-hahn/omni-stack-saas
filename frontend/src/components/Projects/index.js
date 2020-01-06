import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';

import Can from '~/components/Can';
import Members from '~/components/Members';
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
    const { newProject } = this.state;
    const {
      activeTeam,
      toggleProjectModal,
      toggleMembersModal,
      projects,
      members,
    } = this.props;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={toggleProjectModal}>+ New</Button>
            </Can>
            <Button onClick={toggleMembersModal}>Members</Button>
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

        {members.membersModalOpen && (
          <Members />
        )}
      </Container>
    );
  }
}

Projects.propTypes = {
  getProjectsRequest: PropTypes.func.isRequired,
  toggleProjectModal: PropTypes.func.isRequired,
  toggleMembersModal: PropTypes.func.isRequired,
  createProjectRequest: PropTypes.func.isRequired,
  members: PropTypes.shape({
    membersModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
  projects: PropTypes.shape({
    projectModalOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })).isRequired,
  }).isRequired,
  activeTeam: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Projects.defaultProps = {
  activeTeam: null,
};

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
  members: state.members,
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
