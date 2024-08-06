"use server";

import { createClient } from "../utils/supabase/server";

export const getUserInfo = async ({ userId }: GetUserInfoProps) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId); // NOTE: Check again whether this should be "userId" instead of "id"

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("User not found.");
    }

    return data[0]; 
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info. Please try again later.");
  }
};

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in. Please check your credentials.");
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          address1: userData.address1,
          city: userData.city,
          state: userData.state,
          postal_code: userData.postalCode,
          date_of_birth: userData.dateOfBirth,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up. Please try again later.");
  }
};

export const getLoggedInUser = async () => {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    throw new Error("Failed to get logged-in user.");
  }
};

export const logoutAccount = async () => {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: "Successfully logged out." };
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Failed to log out. Please try again later.");
  }
};