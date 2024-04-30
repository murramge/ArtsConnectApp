import {colors} from '@styles/color';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAtomValue} from 'jotai';
import {detailDataAtom} from '../../template/home/DetailPage';

interface MainDetailsInfoProps {}

const MainDetailsInfo = ({}: MainDetailsInfoProps) => {
  const detailInfo = useAtomValue(detailDataAtom);
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailItemList}>
        <Text style={styles.itemTitle}>런타임</Text>
        <Text style={styles.itemText}>{detailInfo?.prfruntime}</Text>
      </View>
      <View style={styles.detailItemList}>
        <Text style={styles.itemTitle}>관람연령</Text>
        <Text style={styles.itemText}>{detailInfo?.prfage}</Text>
      </View>
      <View style={styles.detailItemList}>
        <Text style={styles.itemTitle}>출연진</Text>
        <Text style={styles.itemText}>{detailInfo?.prfcast}</Text>
      </View>
      <View style={styles.detailItemList}>
        <Text style={styles.itemTitle}>제작진</Text>
        <Text style={styles.itemText}>{detailInfo?.prfcrew}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    left: 0,
    width: '100%',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  detailItemList: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 28,
  },
  itemTitle: {
    width: 70,
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 30,
  },
  itemText: {
    width: 200,
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MainDetailsInfo;