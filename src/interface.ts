export interface FormDataState {
  name: string;
  age: number;
  email: string;
  password: string;
  acceptPassword: string;
  gender: string;
  accept: boolean;
  picture: string;
  country: string;
}

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept?: boolean;
  picture: FileList;
  country: string;
}
