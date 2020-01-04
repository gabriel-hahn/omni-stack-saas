import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  toggleMembersModal: null,
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  membersModalOpen: false,
});

export const toggleMembersModal = (state) => (
  state.merge({ membersModalOpen: !state.membersModalOpen })
);

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_MEMBERS_MODAL]: toggleMembersModal,
});
