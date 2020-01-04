import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';

import Modal from '~/components/Modal';
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
    const { activeTeam, toggleProjectModal, projects } = this.props;

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

            <form onSubmit={() => { }}>
              <span>Name</span>
              <input name="newProject" />

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
  projects: PropTypes.shape({
    projectModalOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
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
