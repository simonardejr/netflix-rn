import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import { ProfileContext } from '../components/ProfileContext';
import { filterByCountry, getGeolocation } from '../utils/MovieFilter';
import { getLang, translate } from '../lang/translate';
import {animated, useSpring} from '@react-spring/native';


const api = require('../assets/movies.json')

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

// const Poster = styled.ImageBackground`
//   width: 100%;
//   height: ${(Dimensions.get('window').height * 81) / 100}px;
// `;

const Poster = animated(styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`);

const PosterView = styled.View`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
  backgroundColor: 'rgba(0,0,0, 0.50)'
`

const Home = ({ navigation }) => {
  const [position, setPosition] = useState(null);
  const [nationalMovies, setNational] = useState([]);
  const [internationalMovies, setInternational] = useState([]);
  const {user} = useContext(ProfileContext)

  const animated = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    loop: true,
    config: { duration: 3000 }
  })

  getLang();

  let resumeList = []
  const moviesJson = require('../assets/movieToResume.json')

  if (user && user.name) {
    resumeList = moviesJson[user.name]
  }

  useEffect(() => {
    const obtainLocation = async () => {
      try {
        const currentPosition = await getGeolocation();
        setPosition(currentPosition);
      } catch (err) {
        console.log('Error: ', err);
      }
    }
    obtainLocation();
  }, [])

  useEffect(() => {
    const loadMovies = async () => {
        const movieList = require('../assets/movies.json')
        let filteredList = [];

        if (position) {
          filteredList = await filterByCountry(movieList, position);
          setNational(filteredList)
        }

        setInternational(movieList.filter((item) => {
          return !filteredList.includes(item)
        }))
      }
    loadMovies();
  }, [position])

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Poster resizeMode="cover" source={require('../assets/poster.jpg')}>
          <PosterView>
            <Header navigation={navigation} userdata={user} />
            <Hero />
          </PosterView>
        </Poster>
        {(resumeList.length > 0 && user.name && (<Movies label={`${user.name}, ${translate('continuewatch')}`} item={resumeList} />))}
        {(nationalMovies.length > 0 && (<Movies label={translate('national')} item={nationalMovies}/>))}
        {(internationalMovies.length > 0 && (<Movies label={translate('recommended')} item={internationalMovies} />))}
        <Movies label={translate('topten')} item={api} />
      </Container>
    </>
  );
};

export default Home;
