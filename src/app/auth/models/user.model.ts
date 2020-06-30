export interface User extends firebase.UserInfo {
  // uid: string;
  // displayName: string | null;
  // email: string | null;
  // phoneNumber: string | null;
  // photoURL: string | null;
  // providerId: string;
  myCustomData?: string;
}

export interface Credentials {
  email: string;
  password: string;
}
