import React,{useState, useEffect} from 'react'
import Recipe from "./components/Recipe"
import "./App.css"

const  App = () => {
  const APP_ID = "b944afd3";
  const APP_KEY = "584b7f5762f1e8eb7f776ac0fae1ed3c"
 

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');


  useEffect(() => {
    getRecipe()
  },[query])


  const getRecipe = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e =>{  
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className = "App" onSubmit = {getSearch}>
      <form className = 'search-form'>
        <input 
        type="text" 
        className = "search-bar"
        onChange = {updateSearch}
        value = {search}
        />
        <button type="submit"   className = 'search-button'>
          search
        </button>
      </form>
      <div className = "recipes">      
          {recipes.map(recipe => (
          <Recipe
            key = {recipe.recipe.label}
            title = {recipe.recipe.label}
            calories = {recipe.recipe.calories}
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
          ))}
      </div>
    </div>
  )
}

export default App


