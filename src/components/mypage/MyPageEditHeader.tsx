import {colors} from '@styles/color';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ElevatedView from 'react-native-elevated-view';
import {getProfile} from '@apis/supabase/profile';
import {useNavigation} from '@react-navigation/native';
import useImage from '@hooks/useImage';
import Config from 'react-native-config';
interface MyPageHeaderProps {
  type?: string;
  profileImageUrl?: string;
  onPressCameraButton: () => void;
}

const MyPageHeader = ({
  type,
  profileImageUrl,
  onPressCameraButton,
}: MyPageHeaderProps) => {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
          paddingTop: 40,
        }}></View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ElevatedView
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            backgroundColor: colors.WHITE,
          }}
          elevation={5}>
          <Image
            resizeMode="cover"
            source={{
              uri: profileImageUrl
                ? profileImageUrl
                : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}></Image>
        </ElevatedView>
        <View>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: colors.GRAY_100,
              borderRadius: 100,
              position: 'absolute',
              bottom: 0,
              left: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onPressCameraButton}>
            <FontAwesome name="camera" size={25}></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default MyPageHeader;
