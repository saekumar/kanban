import React from 'react'
import KanbanCard from '../KanbanCard/KanbanCard'
import ThreeDotMenu from '../../assets/icons_FEtask/3 dot menu.svg'
import AddIcon from '../../assets/icons_FEtask/add.svg'
import BacklogIcon from '../../assets/icons_FEtask/Backlog.svg'
import CancelledIcon from '../../assets/icons_FEtask/Cancelled.svg'
import DoneIcon from '../../assets/icons_FEtask/Done.svg'
import HighPriorityIcon from '../../assets/icons_FEtask/Img - High Priority.svg'
import LowPriorityIcon from '../../assets/icons_FEtask/Img - Low Priority.svg'
import MediumPriorityIcon from '../../assets/icons_FEtask/Img - Medium Priority.svg'
import NoPriorityIcon from '../../assets/icons_FEtask/No-priority.svg'
import InProgressIcon from '../../assets/icons_FEtask/in-progress.svg'
import TodoIcon from '../../assets/icons_FEtask/To-do.svg'

// Utility function to sort tickets based on priority or title
const sortTickets = (tickets, sorting) => {
  if (sorting === 'priority') {
    return [...tickets].sort((a, b) => b.priority - a.priority)
  } else if (sorting === 'title') {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title))
  }
  return tickets
}

// Utility function to group tickets based on criteria
const groupTickets = (tickets, grouping, users) => {
  const grouped = {}

  tickets.forEach((ticket) => {
    let key
    if (grouping === 'status') {
      key = ticket.status
    } else if (grouping === 'user') {
      key =
        users.find((user) => user.id === ticket.userId)?.name || 'Unassigned'
    } else if (grouping === 'priority') {
      const priorities = ['No priority', 'Low', 'Medium', 'High', 'Urgent']
      key = priorities[ticket.priority] || 'No priority'
    }

    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(ticket)
  })

  return grouped
}

// Icon mapping based on group names
const groupIcons = {
  'No priority': NoPriorityIcon,
  Low: LowPriorityIcon,
  Medium: MediumPriorityIcon,
  High: HighPriorityIcon,
  Urgent: BacklogIcon, // Assuming "Urgent" corresponds to "Backlog" icon in this case
}

function KanbanBoard({ tickets, users, grouping, sorting }) {
  // Group and sort tickets
  const groupedTickets = groupTickets(tickets, grouping, users)
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce(
    (acc, key) => {
      acc[key] = sortTickets(groupedTickets[key], sorting)
      return acc
    },
    {}
  )

  return (
    <div
      className="kanban-board"
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'start',
        justifyContent: 'space-around',
      }}
    >
      {Object.keys(sortedGroupedTickets).map((group) => (
        <div key={group} style={{ minWidth: '150px', padding: '16px' }}>
          <div
            className=""
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              {groupIcons[group] && (
                <img
                  src={groupIcons[group]}
                  alt={`${group} icon`}
                  style={{ width: '20px', marginRight: '8px' }}
                />
              )}
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                {group}
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '12px',
              }}
            >
              <img
                src={AddIcon}
                alt="Add"
                style={{ width: '16px', cursor: 'pointer' }}
              />
              <img
                src={ThreeDotMenu}
                alt="Options"
                style={{ width: '16px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Render each ticket within the group */}
          {sortedGroupedTickets[group].map((ticket) => (
            <KanbanCard key={ticket.id} ticket={ticket} users={users} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default KanbanBoard
