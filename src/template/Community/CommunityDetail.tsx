import CommunityCardItem from '@components/carditem/CommunityCardItem';
import BackHeader from '@components/header/BackHeader';
import CommentsModal from '@components/modals/CommentsModal';
import CommunityQuitModal from '@components/modals/CommunityQuitModal';
import {colors} from '@styles/color';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CommunityDetailProps {
  data: any;
}

const CommunityDetail = ({data}: CommunityDetailProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View>
      <BackHeader label="모임타이틀" />
      <View style={styles.mainVisual}>
        <Image source={mainVisual} style={styles.mainImg} />
      </View>
      <View style={styles.profileImgArea}>
        <Image source={profileImg} style={styles.profileImg} />
      </View>
      <View style={styles.iconArea}>
        <TouchableOpacity>
          <Image source={shareIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <Image source={moreIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleArea}>
        <View style={styles.titleStyle}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            프랑켄슈타인 {/* {data.perf_name} */}
          </Text>
        </View>
        <View style={styles.communityTitleArea}>
          <Text style={styles.communityTitle}>
            {/* {data.title} */}
            영화같이 볼 사람 영화같이 볼 사람
          </Text>
        </View>
      </View>
      <CommunityQuitModal isVisible={isVisible} setIsVisible={setIsVisible} />
      {/* <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainVisual: {
    width: '100%',
    height: 210,
    borderBottomRightRadius: 16,
  },
  mainImg: {
    width: '100%',
    height: 210,
  },
  profileImgArea: {
    position: 'absolute',
    top: 210,
    left: 23,
    borderRadius: 16,
    zIndex: 5,
  },
  profileImg: {
    width: 110,
    height: 120,
  },
  iconArea: {
    position: 'absolute',
    top: 250,
    right: 13,
    flexDirection: 'row',
    gap: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  titleArea: {
    position: 'absolute',
    top: 278,
    left: 142,
    width: 231,
    height: 71,
    marginBottom: 11,
  },
  titleStyle: {
    width: 135,
    height: 24,
    backgroundColor: colors.MAIN_COLOR,
    borderRadius: 6,
    paddingBottom: 2,
  },
  title: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  communityTitleArea: {
    marginTop: 2,
  },
  communityTitle: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    width: 200,
    marginLeft: 5,
  },
});

export default CommunityDetail;

const mainVisual = require('../../assets/images/community/community_img.png');
const profileImg = require('../../assets/images/community/community_profile.png');
const shareIcon = require('../../assets/icons/share_icon.png');
const moreIcon = require('../../assets/icons/more_icon.png');