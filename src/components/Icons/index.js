import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import FAIcon6 from 'react-native-vector-icons/FontAwesome6';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Icons = ({type, ...props}) => {
  const getIcon = (typeIcon, name) => {
    switch (typeIcon) {
      case 'fontisto':
        return Fontisto;
      case 'material':
        return MaterialIcon;
      case 'evil':
        return EvilIcon;
      case 'feather':
        return Feather;
      case 'ant':
        return AntDesign;
      case 'simpleLine':
        return SimpleLineIcon;
      case 'zocial':
        return ZocialIcon;
      case 'simpleLine':
        return SimpleLineIcon;
      case 'foundation':
        return FoundationIcon;
      case 'fa5':
        return FAIcon5;
      case 'fa6':
        return FAIcon6;
      case 'fa':
        return FAIcon;
      case 'ionicon':
        return Ionicon;
      case 'materialCommunity':
        return MaterialCommunityIcon;
      case 'entypo':
        return EntypoIcon;
      case 'octicon':
        return OcticonIcon;
      case 'svg':
        switch (name) {
          default:
            return null;
        }

      default:
        return FAIcon;
    }
  };
  const FontIcon = getIcon(type, props?.name);
  return <FontIcon {...props} />;
};
export default Icons;
