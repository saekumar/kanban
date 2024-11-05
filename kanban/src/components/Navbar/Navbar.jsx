import React, { useState, useRef, useEffect } from 'react'
import DropDown from '../Dropdown/DropDown'
import DisplayIcon from '../../assets/icons_FEtask/Display.svg'
import DownArrow from '../../assets/icons_FEtask/down.svg'
import './Navbar.css'

const Navbar = ({ setGrouping, setSorting }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleSelect = (value, type) => {
    if (type === 'grouping') {
      setGrouping(value.toLowerCase())
    } else if (type === 'sorting') {
      setSorting(value.toLowerCase())
    }
  }

  return (
    <div className="navbar">
      <div
        ref={dropdownRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '30px',
          gap: '10px',
          borderRadius: '7px',
          padding: '5px',
          cursor: 'pointer',
          marginLeft: '30px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img src={DisplayIcon} alt="Display" />
        <p className="">Display</p>
        <img src={DownArrow} alt="Down Arrow" />
      </div>

      {isDropdownOpen && (
        <div
          className="dropdown-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            marginLeft: '30px',
            flexDirection: 'column',
          }}
        >
          <DropDown
            options={[
              { label: 'By Status', value: 'Status' },
              { label: 'By User', value: 'User' },
              { label: 'By Priority', value: 'Priority' },
            ]}
            label="Grouping"
            onSelect={(value) => handleSelect(value, 'grouping')}
          />

          <DropDown
            options={[
              { label: 'Priority', value: 'Priority' },
              { label: 'Title', value: 'Title' },
            ]}
            label="Sorting"
            onSelect={(value) => handleSelect(value, 'sorting')}
          />
        </div>
      )}
    </div>
  )
}

export default Navbar
