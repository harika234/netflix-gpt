import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';

const GptSearchBar = () => {
    const langkey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    // search movie in tmdb
    const searchMovieTMDB = async(movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      )
      const json = await data.json();

      return json.results;
    }

    const handleGptSearchClick = async() => {
        console.log(searchText.current.value);
        // make an api call to gpt ai and get movie results

        const gptQuery = "Act as a Movie Recommended system and suggest some movies for the query : " + searchText.current.value + ".only give me names of 5 movies, comma separated like the example result given ahead. Example result:gadar,sholay,don,golmal,koi mil gaya ";

      // const gptResults = await openai.chat.completions.create({
      //   messages: [{ role: 'user', content: gptQuery}],
      //   model: 'gpt-3.5-turbo',
      // });
      // const gptResults = await openai.chat.completions.create({
      //   model: 'text-davinci-003',
      //   messages: [{ role: 'user', content: gptQuery }],
      //   stream: true,
      // 
      // const  gptResults = await openai.createChatCompletion({
      //   model: "gpt-4",
      //   messages: [{ role: "user", content:gptQuery }],
      // });
      const gptResults = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: gptQuery }],
        temperature: 0.7,
      });
      
      

      if(!gptResults.choices) {

      }
      console.log(gptResults.choices?.[0]?.message?.content);
      
    }
    return (
    <div className='pt-[10%] flex justify-center'>
        <form className=' w-1/2  bg-black grid grid-cols-12' onSubmit={(e)=> e.preventDefault()}>
            <input 
            ref={searchText}
            type='text' className='p-4 m-4 col-span-9' 
            placeholder={lang[langkey].gptSearchPlaceHolder}
            />
            <button className='col-span-3 py-2 px-4 m-4  bg-red-700 text-white rounded-lg'
            onClick={handleGptSearchClick}
            >
                {lang[langkey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar