// user.ts

export interface User {
  id: string; // assuming there's an ID field for each user
  fullname: string;
  email: string;
  tasks: [];
  token?: string; // token is optional since it may not always be available
  isOnline: boolean;
}
