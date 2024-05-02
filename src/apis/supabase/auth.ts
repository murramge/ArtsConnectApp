import {supabase} from './supabase';
import type {EmailCredentials, EmailSignUp} from './auth.d';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

export const emailSignIn = async ({email, password}: EmailCredentials) => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const emailSignUp = async ({email, password, nickname}: EmailSignUp) => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const kakaoSignIn = async () => {
  try {
    const {accessToken, idToken} = await KakaoLogin.login();
    if (!idToken || !accessToken) {
      throw new Error('토큰을 가져오지 못했습니다.');
    }
    console.log(idToken);

    const {data, error} = await supabase.auth.signInWithIdToken({
      provider: 'kakao',
      token: idToken,
      access_token: accessToken,
    });

    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const checkEmailDuplication = async (email: string) => {
  try {
    const {data, error} = await supabase.rpc('check_email_existence', {
      new_email: email,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data as boolean;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const checkNicknameDuplication = async (nickname: string) => {
  try {
    const {data, error} = await supabase.rpc('check_email_existence', {
      new_nickname: nickname,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data as boolean;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
