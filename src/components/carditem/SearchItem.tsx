import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@styles/color';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {RootStackParamList} from '../../router';

interface SearchItemProps {
  photoUrl?: string;
  title: string;
  period: string;
  place: string;
  id: string;
  cate?: string;
}

const SearchItem = ({
  photoUrl,
  title,
  period,
  place,
  id,
  cate,
}: SearchItemProps) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = useCallback(() => {
    navigate('Detail', {id, photoUrl, title, period, place, cate});
  }, [id, photoUrl, title, period, place, cate, navigate]);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.photo}>
          {photoUrl && (
            <Image
              style={styles.photo}
              source={{uri: `${Config.KOPIS_IMAGE_BASE_URL}/${photoUrl}`}}
            />
          )}
        </View>
        <View style={styles.right}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.descriptionText}>{period}</Text>
          <Text style={styles.descriptionText}>{place}</Text>
          <View style={styles.cateArea}>
            <Text style={styles.cateText}>{cate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.LINE_COLOR,
    paddingVertical: 15,
  },
  photo: {
    width: 117,
    height: 128,
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    shadowColor: colors.GRAY_500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  right: {
    marginTop: 13,
    marginLeft: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.LINE_COLOR,
  },
  nameText: {
    color: colors.GRAY_500,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    width: 180,
  },
  descriptionText: {
    color: colors.GRAY_300,
    fontSize: 12,
  },
  cateArea: {
    borderWidth: 0.5,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.SEARCH_BG,
    marginTop: 10,
    borderRadius: 4,
    width: 57,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingBottom: 2,
  },
  cateText: {
    color: colors.GRAY_500,
    fontSize: 10,
    paddingHorizontal: 10,
  },
});

export default SearchItem;
