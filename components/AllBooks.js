import React, { useEffect, useState } from 'react'
import { API } from '../utils/API'
import CircularLoader from './CircularLoader'

export default function AllBooks() {
    const [books , setBooks] = useState([])
    const [loading ,setLoading] = useState(true)
    useEffect(()=>{
        API.get('/bookStore')
        .then(function(res){
            setLoading(false)
            console.log(res.data.data)
            setBooks(res.data.data)
            console.log(books)
        })
        .catch(function(error){
            setLoading(false)
            console.log(error)
        })
    }, [])

    if(loading)
    {
        return <div className='mt-[20px]'><CircularLoader/></div>
    }

  return (
     <div>
        {books.map(b => {
            return (
                <div key={b._id} className=" pl-[20px] py-[5px] border-b-[3px] border-b-gray-200">
                    <p>Name : {b.Name}</p>
                    <p>Author : {b.Author}</p>
                    <p>ISBN : {b.ISBN}</p>
                    <p>Price : {b.Price}</p>
                    <p>Year : {b.Year}</p>
                    <p>Stock available : {b.Stock_available}</p>
                    <p>Number of pages : {b.Number_of_pages}</p>
                    <p>Country of origin : {b.Country_of_origin}</p>
                    <p>Digital format available : {b.Digital_format_available ? "Yes" : "No"} </p>
                </div>
            )
        })}
     </div>
  )
}
