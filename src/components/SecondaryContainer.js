import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies)
  return (
    movies.nowPlayingMovies && (
    <div className=' bg-black'>
        <div className='-mt-51 pl-12 relative z-20'>
        <MovieList title = {"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title = {"Horror Movies"} movies={movies.nowPlayingMovies}/>
        <MovieList title = {" Recommended"} movies={movies.nowPlayingMovies}/>
        <MovieList title = {" Trending "} movies={movies.nowPlayingMovies}/>
        <MovieList title = {" Comedy "} movies={movies.nowPlayingMovies}/>
        </div>
    </div>
    )
  )
}

export default SecondaryContainer