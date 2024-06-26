import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '@styles/color';
import {getPerformanceFacilityDetail} from '@apis/kopis';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';

const theaterPin = require('@icons/theaters.png');

interface MainDetailsMapProps {
  id: string | undefined;
}
interface LocationProps {
  lat: Float | string | null;
  lng: Float | string | null;
  theater: string | null;
  address: string | null;
}

const DetailPageMap = ({id}: MainDetailsMapProps) => {
  const [location, setLocation] = useState<LocationProps>({
    lat: null,
    lng: null,
    theater: null,
    address: null,
  });

  useEffect(() => {
    const getMapLocationData = async () => {
      try {
        const data = await getPerformanceFacilityDetail(id);

        data &&
          setLocation({
            lat: parseFloat(data.la),
            lng: parseFloat(data.lo),
            theater: data.fcltynm,
            address: data.adres,
          });
      } catch (error) {
        console.log(error);
      }
    };
    getMapLocationData();
  }, []);

  return (
    location && (
      <>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                padding: 10,
                fontWeight: '600',
                fontSize: 16,
                color: colors.BLACK,
              }}>
              공연장 위치
            </Text>
          </View>
          {location.lat && location.lng && (
            <MapView
              style={{width: '100%', height: 300}}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              {location.theater && location.address && (
                <Marker
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                  title={location.theater}
                  description={location.address}>
                  <Image
                    source={theaterPin}
                    style={{width: 52, height: 52}}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </Marker>
              )}
            </MapView>
          )}
        </View>
      </>
    )
  );
};

export default DetailPageMap;
