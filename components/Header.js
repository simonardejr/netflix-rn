import React, { useContext } from 'react';

import styled from 'styled-components/native';

import { translate } from './../lang/translate';


const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px 25px 0 25px;
  width: 100%;
`;

const Logo = styled.Image`
  width: 20px;
  height: 40px;
`;

const Menu = styled.Text`
  font-size: 18px;
  color: #FFF;
  letter-spacing: 0.1px;
`;

const Header = (props) => {
  let avatar = require('../assets/logo.png')
  if (props.userdata && props.userdata.icon) {
    avatar = props.userdata.icon
  }

  return (
    <Container>
      <Logo resizeMode="contain" source={avatar} />
      <Menu>{translate('series')}</Menu>
      <Menu>{translate('movies')}</Menu>
      <Menu>{translate('mylist')}</Menu>
    </Container>
  );
};

export default Header;
