import React, { useState } from 'react'
import Header from './Header'
import ExploreMenu from './ExploreMenu'
import FoodDisplay from './FoodDisplay'
import AppDownload from './AppDownload'
const Home = () => {
  const [category, setCategory]=useState("All")
  return (
    <>
    <Header/>
    <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodDisplay category={category}/>
    <AppDownload/>
    </>
  )
}

export default Home