import React, { useState } from 'react'
import { FaGripLines } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const links = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'About Us',
      path: '/about-us'
    },
    {
      title: 'All Books',
      path: '/all-books'
    },
    {
      title: 'Cart',
      path: '/cart'
    },
    {
      title: 'Profile',
      path: '/profile'
    }
  ]
 const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


 if(isLoggedIn === false){
  links.splice(2,2);
 }

  const [MobileNav, setMobileNav] = useState('hidden')
  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <img
            className='h-10 me-4'
            src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png'
            alt='logo'
          />
          <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </Link>
        <div className='nav-links-bookheaven flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {links.map((items, i) => (
              <Link
                to={items.path}
                className='hover:text-blue-500 transition-all duration-300'
                key={i}
              >
                {items.title}{' '}
              </Link>
            ))}
          </div>
          <div className='hidden md:flex gap-4'>
            <Link
              to='/login'
              className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              Login
            </Link>
            <Link
              to='/Signup'
              className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              SignUp
            </Link>
          </div>
          <button
            className='block md:hiddden text-white text-2xl hover:text-zinc-400'
            onClick={() =>
              MobileNav === 'hidden'
                ? setMobileNav('block')
                : setMobileNav('hidden')
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center `}
      >
        {links.map((items, i) => (
          <Link
            to={items.path}
            className='text-white text-4xl mb-8 font-semibold  hover:text-blue-500 transition-all duration-300'
            key={i}
            onClick={() =>
              MobileNav === 'hidden'
                ? setMobileNav('block')
                : setMobileNav('hidden')
            }
          >
            {items.title}{' '}
          </Link>
        ))}

        <Link
          to='/login'
          className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300
          `}
        >
          Login
        </Link>
        <Link
          to='/Signup'
          className={`${MobileNav}px-8 mb-8 text-3xl font-semibold py-2  bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300
          `}
        >
          SignUp
        </Link>
      </div>
    </>
  )
}

export default Navbar
