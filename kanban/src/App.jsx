import { useEffect, useState } from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard/KanbanBoard'
import Navbar from './components/Navbar/Navbar'
import axios from 'axios'

function App() {
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
  const [grouping, setGrouping] = useState('status')
  const [sorting, setSorting] = useState('priority')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      )
      setTickets(response.data.tickets)
      setUsers(response.data.users)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <Navbar setGrouping={setGrouping} setSorting={setSorting} />
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
    </div>
  )
}

export default App
