import { User } from '../../models/user.model';

export class LoginWithGoogle {
  static readonly type = '[Auth google] Login';
}

export class LoginWithGoogleSuccess {
  static readonly type = '[Auth google] Login Success';
  constructor(public payload: { user: User }) {}
}

export class LoginWithGoogleFailure {
  static readonly type = '[Auth google] Login Failure';
  constructor(public payload: any) {}
}

export class LoginRedirect {
  static readonly type = '[Auth] Login Redirect';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
