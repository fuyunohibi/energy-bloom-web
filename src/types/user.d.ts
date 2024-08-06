declare type LoginUser = {
  email: string;
  password: string;
};

declare interface SignInProps {
  email: string;
  password: string;
}

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
};

declare interface GetUserInfoProps {
  userId: string;
}

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};
