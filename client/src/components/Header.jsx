import { Button, Navbar, NavbarCollapse, TextInput } from 'flowbite-react'
import React from 'react'
import { Link ,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center font-semibold whitespace-nowrap dark:text-white sm:text-xl text-sm'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white'>Harish's</span>
        Blog
        </Link>
        <form>
            <TextInput 
               type='text'
               placeholder='Search...'
               rightIcon={AiOutlineSearch}
               className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 b-10 lg:hidden'  color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button  className='w-12 b-10 hidden sm:inline' color="gray" pill>
                <FaMoon/> 
            </Button>
            <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue' outline >Sign In</Button>
            </Link>
            <Navbar.Toggle/>
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'} >
                    <Link to='/'>Home</Link>
                </Navbar.Link >
                <Navbar.Link active={path === "/about"} as={'div'} >
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'} >
                    <Link to='/projects' >Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
