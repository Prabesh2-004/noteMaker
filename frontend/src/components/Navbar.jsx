import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className='flex fixed w-full px-10 py-3 shadow items-center justify-between'>
        <Link className='text-2xl font-semibold' to="/">Notes Maker</Link>
        {user ? ( <div>
          <button className='px-5 py-2 bg-red-500 text-white font-bold rounded-full'>Logout</button>
        </div> ) : (
          <div className='flex items-center gap-8 '>
            <Link className='px-5 py-2 bg-gray-400 text-white font-bold rounded-full' to="/login">Login</Link>
            <Link className='px-5 py-2 bg-blue-500 text-white font-bold rounded-full' to="/register">Register</Link>
        </div>
        )}
    </nav>
  )
}

export default Navbar