declare type LoginUser = {
  email: string;
  password: string;
};

declare interface SignInProps {
  email: string;
  password: string;
}

declare type SignUpParams = {
  first_name: string;
  last_name: string;
  address1: string;
  city: string;
  province: string;
  postal_code: string;
  date_of_birth: string;
  email: string;
  password: string;
};

declare type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string; 
  address1: string;
  city: string;
  postal_code: string;
  date_of_birth: string;
};

declare interface GetUserInfoProps {
  user_id: string;
}

declare type NewUserParams = {
  user_id: string;
  email: string;
  name: string;
  password: string;
};
