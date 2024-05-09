import React, {ReactNode} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '@router.d';
import {colors} from '@styles/color';

interface StepHeaderProps {
  Color?: {
    leftIconsColor?: string;
    rightIconsColor?: string;
    labelColor?: string;
  };
  label: string | undefined;
  icon?: ReactNode;
  onPressCancel?: () => void;
}

const StepHeader = ({
  Color = {
    leftIconsColor: 'black',
    rightIconsColor: 'black',
    labelColor: 'black',
  },
  label,
  icon = null,
  onPressCancel,
}: StepHeaderProps) => {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        backgroundColor: colors.GRAY_100,
        paddingHorizontal: 10,
        height: 55,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '8%', paddingTop: 5}}>
          <TouchableOpacity
            onPress={() => {
              navigate.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MainTab',
                      state: {
                        routes: [
                          {
                            name: 'Performance',
                          },
                        ],
                      },
                    },
                  ],
                }),
              );
            }}>
            <Icon name="close" color={colors.GRAY_500} size={25}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'flex-start', width: '75%'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              lineHeight: 32,
              color: colors.GRAY_500,
              fontWeight: '500',
              textAlign: 'left',
              marginLeft: 15,
            }}>
            {label}
          </Text>
        </View>
        <View style={{width: '8%'}}>
          <TouchableOpacity>
            <Icon name={icon} color={colors.GRAY_500} size={20}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default StepHeader;
