import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe'

// Wrapper that we put code it: React Component - Root component where all other components fit
// It is also a functional component 

// Arrow function - another way to declare functions in Javascipt '() => {}'
// what about 'blahinput => (blahinput + 1)' -------> (input) => { return input + 1  }
const App = () => {

  // Authentication keys for the Recipe API
  const APP_ID = '782b7995' ;
  const APP_KEY = '1d2bcd7d599deb2649195693ebf2f159';

  // Declaring Variable recipe set to a empty array -> makes setRecipe function that can change recipe
  // Instead of variable, React calls these STATE -> if component has to remember, you basically make a state
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // Refreshes the Root App component, and does w.e it is told to do when refreshing
  useEffect(() => {
    getRecipes();
  }, [query]); // the condition to refresh -> aka if query is change, it detects the change and refreshes
  
  // Fetching data from api using our credentials
  // parsing into json
  // we use batticks and $ sign to inject our variables into the string
  // Why do we use await? ----> basically tell the code to wait until it receives all the data
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits); // Sets the state recipes using the array located at "data.hits"
  }

  /*fetch(https://api.edamam.com)
      .then( response => {
        data = response.json()
      }
        
      )
  */

  // When e - > stands for event 
  // Put the thing that you are typing into Search State 
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log({search})
  }

  // Setting query to w.e is in the search
  // Set Search back to nothing
  const getSearch = e => {
    e.preventDefault(); // Stop auto refresh
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <form onSubmit={getSearch} className="search-form" action="" >
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          blah
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        ))}
        </div>
    </div>
  );
}

export default App;
