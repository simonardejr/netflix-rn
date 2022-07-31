import React from 'react';
import styled from 'styled-components/native';
import Avatar from '../components/Avatar';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { ProfileContext } from '../components/ProfileContext';
import { profiles } from './../assets/profiles'
import { translate } from './../lang/translate';


const Screen = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
`;

const AvatarsContainer = styled.View`
  height: 150px;
`;

const Row = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const NetflixButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  margin: 10px;
  color: gray;
`;

const profilesAvailables = profiles()

const replaceAvatarsWithImage = (props, profilesAvailables) => {
  if (props.route?.params?.name) {
    profilesAvailables.map((item) => {
      if (item.name === props.route.params.name) {
        if (props.route?.params?.image) {
          item.uri = props.route.params.image;
          item.image = null;
        }
        if (props.route?.params?.icon) {
          item.icon = props.route.params.icon;
          item.uri = null;
        }
      }
      return item;
    });
  }
};

const selectProfile = (navigation, item) => {
  navigation.navigate('Home', { name: item.name });
};

const editProfile = (navigation, profiles) => {
  navigation.navigate('ProfileToEdit', { profiles: profiles });
};

const More = (props) => {
  replaceAvatarsWithImage(props, profilesAvailables);

  return (
    <ProfileContext.Consumer>
      {({user, setUser}) => 
        <Screen>
          <AvatarsContainer>
            <Row horizontal>
              {profilesAvailables.map((item) => {
                return (
                  <Avatar
                    key={item.name}
                    image={item.icon}
                    uri={item.uri}
                    name={item.name}
                    onPress={() => {
                      setUser(item)
                      selectProfile(props.navigation, item)
                    }}
                  />
                );
              })}
            </Row>
          </AvatarsContainer>
          <NetflixButton
            onPress={() => editProfile(props.navigation, profilesAvailables)}>
            <Icons name="edit" size={24} color="gray" />
            <ButtonLabel>{translate('manageprofile')}</ButtonLabel>
          </NetflixButton>
        </Screen>
    }
    </ProfileContext.Consumer>
  );
};

export default More;
