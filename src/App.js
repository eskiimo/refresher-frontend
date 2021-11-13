import React from 'react'
import { Routes, Route} from 'react-router-dom'
import NewPlace from './places/pages/place'

import Users from './user/pages/users'

const App =()=> {
  return(
 
    <Routes>
   
     <Route path="/"exact element={<Users/>}> </Route>
     <Route path="/pages" exact element={<NewPlace/>}> </Route>
   
    </Routes>
 
  )
}

export default App;
