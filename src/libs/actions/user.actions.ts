"use server";


export const signIn = async ({ email, password }: signInProps) => {};

export const signUp = async ({password, ...userData }: SignUpParams) => {};

export const getLoggedInUser = async () => {};

export const getUserInfo = async ({ userId }: getUserInfoProps) => {};

export const logout = async () => {};