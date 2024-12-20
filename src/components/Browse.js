
import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.js';
import GptSearch from './GptSearch.js';
import Header from './Header'

import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  useNowPlayingMovies();
  return (
    <div>
      <Header/>
      {
        showGptSearch? <GptSearch/> : 
        <>
           <MainContainer/>
           <SecondaryContainer/>
        </>
      }
      
     
      
    </div>
  )
}

export default Browse

