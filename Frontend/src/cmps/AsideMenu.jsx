import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useModal } from '../customHooks/ModalContext.jsx'

import { Accordion, AccordionSummary, AccordionDetails, Typography, } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { BuyerOrders } from './BuyerOrders.jsx'
import SvgIcon from './SvgIcon.jsx'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AsideMenu({ user, onClose, theBuyer, onChatState,
  chatNotification, setChatNotification,
}) {
  const navigate = useNavigate()
  const { openLogin, openSignup } = useModal()

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  async function onLogout() {
    try {
      navigate('/')
      await logout()
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <div className="aside-menu flex column" onClick={(e) => e.stopPropagation()}>
      {user ? (
        <>
          <div className="top-icons flex row">
            <div className="user-info flex row">
              <img src={user.imgUrl} alt="user" />
              <span>{user.username}</span>
            </div>
            {theBuyer && (
              <span
                className={`chat-icon ${chatNotification ? 'notification' : ''}`}
                onClick={(e) => {
                  setChatNotification(false)
                  onChatState(e)
                }}
              >
                <SvgIcon iconName={'chat'} />
              </span>
            )}
          </div>
          <Link to={`/user/${user._id}`} onClick={onClose}>
            Profile
          </Link>

          <Link to="/explore" onClick={onClose}>
            {' '}
            Explore{' '}
          </Link>

          <Link to="/" onClick={onClose}>
            Become a Seller
          </Link>

          <Link to="/dashboard" onClick={onClose}>
            Dashboard
          </Link>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                Orders
              </Typography>
            </AccordionSummary>

            <AccordionDetails id="panel1bh-content">
              <BuyerOrders user={user} onClose={onClose} />
            </AccordionDetails>
          </Accordion>
          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="join"
            onClick={() => {
              onClose()
              openSignup()
            }}
          >
            Join
          </button>
          <button
            className="login"
            onClick={() => {
              onClose()
              openLogin()
            }}
          >
            Sign In
          </button>
          <Link to="/explore" onClick={onClose}>
            {' '}
            Explore{' '}
          </Link>
          <Link to="/" onClick={onClose}>
            Become a Seller
          </Link>
        </>
      )}
    </div>
  )
}