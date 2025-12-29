import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';
import { useContext } from 'react';
const Navbar = () => {
const navigate= useNavigate();
const{isLoggedIn, login, logout}= useContext(AuthContext);


const loggin=()=>{
 navigate('/login');
};





  return (
    <div>
        <ul className='flex justify-between items-center absolute top-0 left-0 right-0 p-4 bg-linear-to-r from-white to-fuchsia-300 '>
           <h2 className='pl-3 text-2xl font-bold'>Votting site</h2> 
           <div className='flex gap-20 pl-96 absolute right-130  font-bold pt-7 '>
                <li><Link to='/Hoomes'>Homes</Link></li>
                <li><Link to='/'>Candidates</Link></li>
                <li><Link to='/results'>Result</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/adminsighn'>Candidate login</Link></li>
           </div>
           
           <div className='flex gap-4'>
            {isLoggedIn ?(
            <button onClick={logout}>logout</button>
            
            ):

          ( <button onClick={loggin}>login</button>)
        
}
                <div className='flex pr-7'><Link to='/profile'><img  alt='alt'/></Link>profile</div>


           </div>


        </ul>
    </div>
  );
}

export default Navbar;
