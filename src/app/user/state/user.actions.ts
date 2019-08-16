import { Action } from '@ngrx/store';

export enum UserActionTypes {
    SetMaskUsername = '[User] Set Mask Username'
};

export class SetMaskUsername implements Action {
    readonly type = UserActionTypes.SetMaskUsername;
    constructor(public payload: boolean) {}
}

export type UserActions = SetMaskUsername;
