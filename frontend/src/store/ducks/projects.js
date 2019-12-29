import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
});

export const ProjectsTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  data: [],
});

export const success = (state, { data }) => state.merge({ data });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
});
