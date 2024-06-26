import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@pages/Home/main/Home';
import CustomBottomTabBar from '@components/common/CustomBottomTabBar';
import TicketingPage from './pages/Home/booking/Booking';
import Search from '@pages/Home/search/Search';
import SearchResultPage from './pages/Home/search/SearchResultPage';
import Login from '@pages/Sign/Login';
import CommunitySelect from '@pages/CommunitySelect/steppage/CommunityFirstStep';
import NewPassword from '@pages/Sign/passwordPage/NewPasswordPage';
import FindPassword from '@pages/Sign/passwordPage/FindPasswordPage';
import CommunityDetail from '@pages/Community/CommunityDetail';
import ArtDaysTwoStap from '@pages/CommunitySelect/steppage/CommunityTwoStep';
import ArtTimesThreeStap from '@pages/CommunitySelect/steppage/CommunityThreeStep';
import CommunityDateSelect from '@pages/CommunitySelect/steppage/CommunityFourStep';
import CommunityIntroduce from '@pages/CommunitySelect/steppage/CommunityFiveStep';
import CommunitySummary from '@pages/CommunitySelect/steppage/CommunityLastStep';
import CommunitySelectLayOut from '@pages/CommunitySelect/CommunitySelectLayOut';
import Splash from '@pages/Splash';
import MyPage from '@pages/MyPage/MyPage';
import AuthHome from '@pages/Sign/AuthHome';
import SignUp from '@pages/Sign/SignUp';
import ProfileEdit from '@pages/MyPage/ProfileEdit';
import Setting from '@pages/MyPage/setting/Setting';
import Detail from '@pages/Home/detail/Detail';
import Community from '@pages/Community/Community';

import {MainBottomTabParamList, RootStackParamList} from './router.d';
import OnBoardingHome from '@pages/Onboarding/OnBoarding';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const MainTab = () => {
  const renderTabBar = (props: BottomTabBarProps) => (
    <CustomBottomTabBar {...props} />
  );
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Performance" component={Home} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={MyPage} />
    </Tab.Navigator>
  );
};

function Router() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingHome}
        options={{gestureEnabled: false}}
      />
      <Stack.Group navigationKey="Authentication">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="NewPasswordPage" component={NewPassword} />
        <Stack.Screen name="FindPasswordPage" component={FindPassword} />
      </Stack.Group>
      <Stack.Group navigationKey="Community">
        <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
        <Stack.Screen name="CommunitySelect" component={CommunitySelect} />
        <Stack.Screen
          name="CommunitySelectTwoStap"
          component={ArtDaysTwoStap}
        />
        <Stack.Screen
          name="CommunitySelectThreeStap"
          component={ArtTimesThreeStap}
        />
        <Stack.Screen
          name="CommunitySelectFourStap"
          component={CommunityDateSelect}
        />
        <Stack.Screen
          name="CommunitySelectFiveStap"
          component={CommunityIntroduce}
        />
        <Stack.Screen
          name="CommunitySelectLastStap"
          component={CommunitySummary}
        />
        <Stack.Screen
          name="CommunitySelectLayOut"
          component={CommunitySelectLayOut}
        />
      </Stack.Group>
      <Stack.Group navigationKey="Performance">
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Ticketing" component={TicketingPage} />
        <Stack.Screen name="Search" component={Search} />

        <Stack.Screen
          name="PerformanceSearchResult"
          component={SearchResultPage}
        />
      </Stack.Group>
      <Stack.Group navigationKey="Profile">
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default Router;
