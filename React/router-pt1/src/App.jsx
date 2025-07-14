import useApi from './hooks/useApi.js'
import './App.css'

function App() {
 
  const {data, loading, error} = useApi(`https://jsonplaceholder.typicode.com/users`)
   
  if(loading)return  <p>loading...</p>
  if(error) return <p>{error.message}</p>
  console.log("data", data)
  return (
    <>
        <ol type="A">
      {(data || []).map((elem)=>(
        <li key={elem.id}>{elem.name}</li>
      ))}
      </ol>
    </>
  )
}

export default App;
