import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  toggleProjectModal: null,
});

export const ProjectsTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
});

export const success = (state, { data }) => state.merge({ data });
export const toggleModal = (state) => (
  state.merge({ projectModalOpen: !state.projectModalOpen }));

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.TOGGLE_PROJECT_MODAL]: toggleModal,
});
