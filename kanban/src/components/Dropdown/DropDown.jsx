import React, { useState, useRef, useEffect } from 'react'
import DownArrow from '../../assets/icons_FEtask/down.svg'

const DropDown = ({ options, label, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(options[0].value)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSelect = (value) => {
    setSelectedValue(value)
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} style={{ width: '200px', position: 'relative' }}>
      <div
        onClick={toggleDropdown}
        className="dropdown-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          justifyContent: 'space-between',
          padding: '5px 10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          borderRadius: '4px',
        }}
      >
        <p>{label}</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            height: '30px',
          }}
        >
          <p>{selectedValue}</p>
          <img src={DownArrow} alt="Down Arrow" style={{ marginLeft: '5px' }} />
        </div>
      </div>

      {isOpen && (
        <ul
          style={{
            top: '100%',
            left: 0,
            width: '100%',

            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',

            padding: '5px 0',
            marginTop: '5px',
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option.value)}
              style={{
                position: 'relative',
                padding: '8px 10px',
                cursor: 'pointer',
                listStyleType: 'none',
                marginLeft: '70px',
                // borderBottom:
                //   index < options.length - 1 ? '1px solid #eee' : 'none',
                // backgroundColor:
                //   selectedValue === option.value ? '#f0f0f0' : 'white',
              }}
              // onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
              // onMouseLeave={(e) =>
              //   (e.target.style.backgroundColor =
              //     selectedValue === option.value ? '#f0f0f0' : 'white')
              // }
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropDown
