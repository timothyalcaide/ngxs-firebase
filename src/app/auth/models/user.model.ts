export interface User extends firebase.UserInfo {
  myCustomData?: string;
}

// firebase.UserInfo
// uid: string;
// displayName: string | null;
// email: string | null;
// phoneNumber: string | null;
// photoURL: string | null;
// providerId: string;
