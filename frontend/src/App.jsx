import {Route, Routes} from "react-router"

import HomePage from "./Pages/HomePage"
import CreatePage from "./Pages/CreatePage"
import NoteDetailPage from "./Pages/NoteDetailPage"

const App = () => {
  return (
    <div>
      <button className = "btn btn-primary">click</button>
<Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/create" element={<CreatePage />} />
    <Route path="/note/:id" element={<NoteDetailPage />} />

</Routes>

    </div>
  )
}

export default App