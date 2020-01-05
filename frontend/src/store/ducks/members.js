import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  toggleMembersModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateMemberRequest: ['id', 'roles'],
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  membersModalOpen: false,
});

export const updateMember = (state, { id, roles }) => state.merge({
  data: state.data.map((member) => (member.id === id) ? { ...member, roles } : member)
});
export const getSuccess = (state, { data }) => state.merge({ data });
export const toggleMembersModal = (state) => (
  state.merge({ membersModalOpen: !state.membersModalOpen })
);

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_MEMBERS_MODAL]: toggleMembersModal,
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
});
