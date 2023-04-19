export interface IProfFormValidationValues {
  school: string;
  name: string;
  department: string;
}

export interface ISchoolFormValidationValues {
  name: string;
  city: string;
  state: string;
  country: string;
}

export interface ISignupFormValidationValues {
  name: string;
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface ISigninFormValidationValues {
  email: string;
  password: string;
}

export interface IUserUpdateFormValidationValues {
  name: string;
  email: string;
}

export interface IUserPasswordFormValidationValues {
  password: string;
}

export interface IUserSecurityAnswerFormValidationValues {
  securityAnswer: string;
}


export interface IPostReviewValues {
  comment: string;
}


export interface IForgotPassValues {
  email: string;
}
