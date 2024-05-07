import React, {useEffect} from 'react';
import {colors} from '@styles/color';
import {StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../atoms/buttons/CommonButton';
import SignInput from '@components/common/input/SignInput';
import {PasswordResetSchema, PasswordResetType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {NewPasswordInput} from '@utils/sign';
import BackHeader from '@components/common/header/BackHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../router';
import {signInByPkceCode, updatePassword} from '@apis/supabase/auth';
import {popToSpecificRoute} from '@utils/route';
import Toast from 'react-native-toast-message';

const NewPassword = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'NewPasswordPage'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {control, handleSubmit} = useForm<PasswordResetType>({
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(PasswordResetSchema),
  });

  useEffect(() => {
    initiate();
    async function initiate() {
      try {
        await signInByPkceCode(params.code);
      } catch (e) {
        // goBack();
      }
    }
  }, [params]);

  const onSubmit = async ({password}: PasswordResetType) => {
    try {
      // await updatePassword(password);

      navigation.replace('Login');
      Toast.show({text1: '비밀번호가 재설정되었습니다.', type: 'success'});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <BackHeader
        label="새 비밀번호 설정하기"
        Color={{
          labelColor: colors.GRAY_500,
          leftIconsColor: colors.GRAY_500,
        }}
      />
      <View style={styles.inputContainer}>
        {NewPasswordInput.map((item, index) => (
          <Controller
            key={index}
            control={control}
            name={item.name}
            defaultValue={''}
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.title}>{item.label}</Text>
                  {error && (
                    <Text
                      style={{
                        color: colors.MAIN_COLOR,
                        fontSize: 11,
                        paddingRight: 15,
                      }}>
                      {error.message}
                    </Text>
                  )}
                </View>
                <SignInput
                  label={item.label}
                  value={value}
                  onChangeText={onChange}
                  type={item.type}
                  error={error}
                />
              </>
            )}
          />
        ))}

        <View style={styles.button}>
          <CommonButton onPress={handleSubmit(onSubmit)} label="확인" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 73,
    marginHorizontal: 20,
    gap: 5,
    backgroundColor: colors.WHITE,
  },
  title: {
    color: colors.BLACK,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 22,
    marginBottom: 2,
  },
  button: {
    marginTop: 15,
  },
});

export default NewPassword;