'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User } from 'next-auth'
import { Button } from "./ui/button"
const Navbar = () => {
  const { data: session } = useSession()

  const user: User = session?.user as User
  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className='container mx-auto flex flex-col
    md:flex-row justify-between items-center'>
        <a href="/" className='text-xl font-bold mb-4 md:mb-0'> Anonymous Message</a>
        {
          session ? (
            <>
            <div className="flex items-center gap-2">
              <span className="mr-4">Welcome , {user.username}</span>
             
              <Link  href='/dashboard'><Button className=" ">Dashboard</Button></Link>
              <Button className="w-full md:w-auto" onClick={() => {
                signOut()
              }}>Sign Out</Button>
           
            </div>
            
              </>
          ) : (<div className="flex gap-2"><Link  href='/signIn'><Button className=" bg-white hover:bg-white text-black scale-110">LogIn</Button>
                </Link><Link  href='/signup'><Button className=" ">SignUp</Button></Link></div>)
        }
      </div>
    </nav>
  )
}

export default Navbar
