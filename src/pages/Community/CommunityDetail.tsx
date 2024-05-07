import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Button,
  ToastAndroid,
} from 'react-native';
import BackHeader from '@components/common/header/BackHeader';
import CommunityQuitModal from '@components/common/modals/CommunityQuitModal';
import CommunityJoinModal from '@components/common/modals/CommunityJoinModal';
import {colors} from '@styles/color';
import IonIcon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import CommonButton from '../../atoms/buttons/CommonButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {
  getJoinedMeetings,
  getMeeting,
  joinMeeting,
} from '@apis/supabase/meeting';
import {MeetingInfo} from '@apis/supabase/meeting.d';
import {getCurrentAuthUser} from '@apis/supabase/auth';

const PosterImageWidth = 110;
const PosterImageHeight = PosterImageWidth * 1.1;

interface CommunityDetailProps
  extends NativeStackScreenProps<RootStackParamList, 'CommunityDetail'> {}

const CommunityDetail = ({navigation, route}: CommunityDetailProps) => {
  const [meeting, setMeeting] = useState<MeetingInfo>();
  const [error, setError] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const onPressJoinCancel = () => {
    setIsJoinModalOpen(false);
  };
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  useEffect(() => {
    fetch();
  }, [route.params.id]);

  const fetch = async () => {
    try {
      const [fetchedMeeting, joinedMeetings] = await Promise.all([
        getMeeting(route.params.id),
        getJoinedMeetings(),
      ]);

      const foundMeeting = joinedMeetings.find(
        joinedMeeting => fetchedMeeting.id === joinedMeeting.id,
      );

      if (foundMeeting) {
        setIsJoined(true);
        foundMeeting.is_owner && setIsOwner(true);
      } else {
        setIsJoined(false);
      }
      setMeeting(fetchedMeeting);
    } catch (e) {
      setError('에러가 발생했습니다.');
    }
  };

  const onPressJoinButton = async () => {
    if (!meeting) {
      return;
    }
    try {
      if (await getCurrentAuthUser()) {
        await joinMeeting(meeting.id);
        await fetch();
      } else {
        //TODO: 모임 참여 모달
        setIsJoinModalOpen(true);
        //navigation.navigate('Login');
      }
    } catch (e) {
      // TODO: 이미 가입한 모임이거나, 이미 꽉 찬 모임일 경우 에러 처리(Modal or Toast)
      console.warn(e);
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    }
  };

  if (error) {
    // TODO: 에러 화면
    return <View />;
  }

  if (!meeting) {
    // TODO: 로딩 화면
    return <View />;
  }

  if (meeting) {
    const {
      title,
      introduction,
      current_occupancy,
      max_occupancy,
      meeting_at,
      perf_name,
      perf_at,
      perf_image_url,
    } = meeting;

    return (
      <View style={{flex: 1}}>
        <BackHeader label={title} />
        <View style={styles.mainVisual}>
          <Image source={mainVisual} style={styles.mainImg} />
        </View>
        <View style={styles.profileImgArea}>
          <Image source={{uri: perf_image_url}} style={styles.profileImg} />
          <View style={styles.iconArea}>
            <TouchableOpacity
              onPress={async () => {
                await Share.share({message: `${perf_name} ${title}`});
              }}>
              <Image source={shareIcon} style={styles.icon} />
            </TouchableOpacity>
            {isJoined && (
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Image source={moreIcon} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.titleArea}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {perf_name}
            </Text>
            <Text style={styles.communityTitle}>{title}</Text>
          </View>
          <View style={styles.mainContentContainer}>
            <View style={styles.scheduleContainer}>
              <View style={styles.scheduleSection}>
                <Text style={styles.scheduleLabel}>공연일정</Text>
                <Text style={styles.scheduleDateTime}>
                  {dayjs(perf_at).format('YYYY년 MM월 DD일 HH시 mm분')}
                </Text>
              </View>
              <View style={styles.scheduleSection}>
                <Text style={styles.scheduleLabel}>모임일정</Text>
                <Text style={styles.scheduleDateTime}>
                  {dayjs(meeting_at).format('YYYY년 MM월 DD일 HH시 mm분')}
                </Text>
              </View>
              <View style={styles.scheduleSection}>
                <IonIcon name="person" color={colors.GRAY_300} />
                <Text style={styles.peopleLabel}>인원</Text>
                <Text
                  style={
                    styles.peopleCount
                  }>{`${current_occupancy}/${max_occupancy}`}</Text>
              </View>
            </View>
            <View style={styles.meetingDescriptionContainer}>
              <Text style={styles.meetingDescriptionTitle}>모임소개</Text>
              <Text style={styles.meetingDescriptionText}>{introduction}</Text>
            </View>
          </View>
        </View>
        {!isJoined && (
          <View>
            <View style={styles.buttonContainer}>
              <CommonButton label="가입하기" onPress={onPressJoinButton} />
            </View>
            <CommunityJoinModal
              isJoinModalOpen={isJoinModalOpen}
              onPressJoinCancel={onPressJoinCancel}
              perf_image_url={meeting.perf_image_url}
              perf_name={meeting.perf_name}
              title={meeting.title}
              perf_at={meeting.perf_at}
              current_occupancy={meeting.current_occupancy}
              max_occupancy={meeting.max_occupancy}
            />
          </View>
        )}

        <CommunityQuitModal isVisible={isVisible} setIsVisible={setIsVisible} />
        {/* <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} /> */}
      </View>
    );
  }
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
    borderRadius: 16,
    zIndex: 5,
  },
  profileImg: {
    borderRadius: 16,
    position: 'absolute',
    top: -PosterImageHeight / 2,
    left: 16,
    width: PosterImageWidth,
    height: PosterImageHeight,
  },
  iconArea: {
    position: 'absolute',
    top: -16,
    right: 13,
    flexDirection: 'row',
    gap: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  mainContainer: {flex: 1, paddingHorizontal: 16},
  titleArea: {
    marginTop: 16,
    marginLeft: PosterImageWidth + 16,
    gap: 4,
  },
  titleStyle: {
    alignItems: 'flex-start',
  },
  title: {
    maxWidth: '60%',
    color: colors.WHITE,
    backgroundColor: colors.MAIN_COLOR,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  communityTitle: {
    color: colors.GRAY_500,
    fontSize: 16,
    fontWeight: '600',
    width: 200,
    marginLeft: 5,
  },
  mainContentContainer: {flex: 1},
  scheduleContainer: {
    backgroundColor: colors.GRAY_100,
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 24,
    marginVertical: 16,
    gap: 8,
  },
  scheduleSection: {flexDirection: 'row', gap: 4, alignItems: 'center'},
  scheduleLabel: {color: colors.MAIN_COLOR, fontWeight: 'bold'},
  scheduleDateTime: {color: colors.GRAY_400, fontWeight: '700'},
  peopleLabel: {
    color: colors.GRAY_400,
  },
  peopleCount: {
    color: colors.GRAY_400,
  },
  meetingDescriptionContainer: {
    flex: 1,
    marginBottom: 8,
  },
  meetingDescriptionTitle: {
    color: colors.GRAY_600,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 8,
  },
  meetingDescriptionText: {
    color: colors.GRAY_500,
  },
  buttonContainer: {padding: 16},
});

export default CommunityDetail;

const mainVisual = require('../../assets/images/community/community_img.png');
const shareIcon = require('../../assets/icons/share_icon.png');
const moreIcon = require('../../assets/icons/more_icon.png');