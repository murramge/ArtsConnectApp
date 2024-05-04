import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors} from '@styles/color';
import CommonButton from '../../atoms/buttons/CommonButton';

const CommunityWithdrawModal = ({
  isWithdrawModalOpen,
  onPressWithdrawCancel,
}: {
  isWithdrawModalOpen: boolean;
  onPressWithdrawCancel: () => void;
}) => {
  return (
    <View>
      <Modal
        style={{}}
        animationType="slide"
        transparent={true}
        visible={isWithdrawModalOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LottieView
              source={require('@lotties/doorOpen.json')}
              style={{width: 100, height: 100}}
              autoPlay
              loop
            />
            <Text>모임명</Text>

            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: colors.BLACK,
                textAlign: 'center',
                paddingBottom: 24,
              }}>
              모임을{'\n'}탈퇴하시겠습니까?
            </Text>
            <View style={{paddingBottom: 10, width: 300}}>
              <CommonButton
                label="예"
                borderRadius={32}
                onPress={() => {
                  console.log('모임탈퇴처리');
                  onPressWithdrawCancel();
                }}
              />
            </View>
            <Pressable
              style={{
                width: 300,
                backgroundColor: colors.GRAY_300,
                paddingHorizontal: 24,
                paddingVertical: 18,
                borderRadius: 32,
                margin: 2,
              }}
              onPress={onPressWithdrawCancel}>
              <Text style={styles.textStyle}>아니요</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 35,
    width: 374,
    height: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CommunityWithdrawModal;
