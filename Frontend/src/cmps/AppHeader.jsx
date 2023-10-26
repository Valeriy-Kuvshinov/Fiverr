import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'
import { SearchBar } from './SearchBar.jsx'
import { NavBar } from './NavBar.jsx'
import { UserDropdown } from './UserDropdown.jsx'
import { category } from '../services/gig.service'
import { setFilter } from '../store/gig.actions'
import SvgIcon from './SvgIcon'

import dotIcon from '../assets/img/svg/dot.icon.svg'

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [headerStage, setHeaderStage] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)

  const userInfoRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const user = useSelector(storeState => storeState.userModule.user)
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
  const { showModal, openLogin, openSignup } = useModal()
  const categories = category
  const isHomePage = location.pathname === '/'

  const headerStyles = {
    backgroundColor: headerStage >= 1 ? '#fff' : 'transparent',
    color: isHomePage && headerStage === 0 ? '#fff' : '#62646a',
  }

  const navBarStyles = {
    borderBottom: headerStage >= 2 ? '2px solid #e4e5e7' : 'none',
    borderTop: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
  }

  const joinButtonStyles = {
    color: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
    borderColor: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
  }

  const closeDropdown = (e) => {
    if (userInfoRef.current && !userInfoRef.current.contains(e.target)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        if (window.scrollY < 50) setHeaderStage(0)
        else if (window.scrollY < 150) setHeaderStage(1)
        else setHeaderStage(2)
      }
      window.addEventListener('scroll', handleScroll)
      setHeaderStage(0)
      return () => window.removeEventListener('scroll', handleScroll)
    }
    else setHeaderStage(2)

    window.addEventListener('click', closeDropdown)
    return () => {
      window.removeEventListener('click', closeDropdown)
    }
  }, [isHomePage])

  async function onLogout() {
    try {
      navigate('/')
      await logout()
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (!searchQuery) return
    setFilter({ ...filterBy, search: searchQuery })
    navigate(`/explore`)
  }

  function setCatFilter(category) {
    setFilter({ ...filterBy, cat: category })
  }

  return (
    <header className={`app-header flex column full ${isHomePage ? 'home-page' : ''} ${showModal ? 'show-modal' : ''}`} style={headerStyles}>
      <nav className="main-nav">
        <div className="container flex row">
          <div className='logo-dropdown-area flex row'>
            <SvgIcon iconName={headerStage === 0 ? 'headerDropdownWhite' : 'headerDropdownGray'} />

            <Link to="/" style={{ color: headerStyles.color }}>
              <h1 className='logo flex'>Giggler<span className='flex'><img src={dotIcon} /></span></h1>
            </Link>
          </div>

          <SearchBar
            placeholder="What service are you looking for today?"
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            visibility={headerStage === 2 ? 'visible' : 'hidden'}
          />
          
          <ul className="nav-links flex">
            <li>
              <Link to="/explore" style={{ color: headerStyles.color }}>Explore</Link>
            </li>

            <li>
              <Link to="/" style={{ color: headerStyles.color }}>Become a Seller</Link>
            </li>
            {user ? (
              <>
                <li className="user-info flex" onClick={() => setShowDropdown(!showDropdown)} ref={userInfoRef}>
                  {user.imgUrl && <img src={user.imgUrl} alt="User" />}
                  {showDropdown && <UserDropdown user={user} onClose={() => setShowDropdown(false)} />}
                </li>

                <li>
                  <button className="logout" onClick={onLogout} style={{ color: headerStyles.color }}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="login" onClick={openLogin} style={{ color: headerStyles.color }}>Sign In</button>
                </li>

                <li>
                  <button className="join" onClick={openSignup} style={joinButtonStyles}>Join</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <NavBar
        categories={categories}
        display={headerStage === 2 ? 'flex' : 'none'}
        headerStage={headerStage}
        setCatFilter={setCatFilter}
        style={navBarStyles}
      />
    </header>
  )
}