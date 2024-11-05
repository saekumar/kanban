import React from 'react'

const KanbanCard = ({ ticket, users }) => {
  // Extract initials from the user name
  const initials = users
    .find((user) => user.id === ticket.userId)
    ?.name.split(' ')
    .map((n) => n[0])
    .join('')

  const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent']

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        marginBottom: '16px',
        width: '100%',
        maxWidth: '300px',
      }}
    >
      {/* Header with Ticket ID and User Avatar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#666' }}>
          {ticket.id}
        </div>

        {/* User Avatar Circle */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#333',
          }}
        >
          {initials}
        </div>
      </div>

      {/* Title */}
      <div
        style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}
      >
        {ticket.title}
      </div>

      {/* Priority and Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Priority Icon */}
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#ffeb3b', // Yellow color for priority icon
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#555',
            fontSize: '12px',
          }}
        >
          !
        </div>

        {/* Tag */}
        <div
          style={{
            backgroundColor: '#e0e0e0', // Light gray for tag
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            color: '#555',
          }}
        >
          {ticket.tag[0]}
        </div>
      </div>
    </div>
  )
}

export default KanbanCard
