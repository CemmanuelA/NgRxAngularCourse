import { User } from '../user';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
    maskUserName: boolean;
    user: User;
}

const initialState: UserState = {
    maskUserName: false,
    user: null
};

// Create a feature to access to the user state
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getUser = createSelector(
    getUserFeatureState,
    state => state.user
);


export const reducer = (state = initialState, action): UserState => {
    switch (action.type) {
        case 'MASK_USER_NAME':
            return { ...state, maskUserName: action.payload};
        default:
            return state;
    }
};
