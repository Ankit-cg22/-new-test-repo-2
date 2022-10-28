import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import AddBook from '../components/AddBook'
import AllBooks from '../components/AllBooks'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [curOption , setCurOption] = useState(0)

  return (
    <div className='w-full h-[100vh]'>
      <div className='h-[10%] max-h-[100px]'>
        <Navbar/>
      </div>
      <div className='h-[90%] max-w-[1400px] m-auto flex'>
        <div className='bg-gray-300 h-full w-[30%] flex justify-center'>
          <div className='h-[50%] max-h-[50px] flex flex-col justify-between  mt-[20px] w-full '>
              <div className={`sidebar-link ${curOption == 1 && `bg-gray-400`} `} onClick={() => setCurOption(1)} >
                  <p>Add book</p>
              </div> 
              <div className={`sidebar-link ${curOption == 2 && `bg-gray-400`} `} onClick={() => setCurOption(2)}>
                  <p>Get all books</p>
              </div>              
          </div>
        </div>
        <div className='h-full w-[70%] overflow-auto'>
          {curOption==1 && <AddBook/>}
          {curOption==2 && <AllBooks/>}
        </div>
      </div>
      

    </div>
  )
}
