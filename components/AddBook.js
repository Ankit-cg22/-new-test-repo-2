import React , {useRef, useState} from 'react'
import { API } from '../utils/API'
import CircularLoader from './CircularLoader'

export default function AddBook() {

    var bookData = {}
    const selectRef = useRef()
    const inputRef = useRef()
    const [loading , setLoading] = useState(false)

    const handleChange = (e) => {
        bookData = {...bookData , [e.target.name] : e.target.value}
    }

    function validName(str) {
        return /^[A-Za-z\s.]*$/.test(str);
      }

    const handleSubmitClick = (e) => {
        e.preventDefault()
        bookData = {...bookData , 'Digital_format_available' : selectRef.current.value === 'false' ? false : true }
        setLoading(true)
        
        if (!validName(bookData.Author) )
        {
            alert("Author input is not valid")
            setLoading(false)
            return
        }

        if (!validName(bookData.Country_of_origin) )
        {
            alert("Country input is not valid")
            setLoading(false)
            return
        }

        API.post('/bookStore' , bookData )
        .then(function(response){
            setLoading(false)
            Array.from(document.getElementsByTagName('input')).map(e => e.value = "")
            alert("Book added successfully")
        })
        .catch(function(error){
            setLoading(false)
            Array.from(document.getElementsByTagName('input')).map(e => e.value = "")
            alert(error.response.data.message)
        })
        

        
    }

  return (
    <div className='flex justify-center'>
        <div className='p-[20px] rounded-[5px] w-[60%]  bg-gray-400 mt-[20px] my-[20px]'>
            <form onSubmit={(e) => handleSubmitClick(e)}>
                <div className='input-holder'><input required className='input' placeholder='ISBN' type="text" name="ISBN" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input required className='input' placeholder='Name' type="text" name="Name" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input required className='input' placeholder='Author' type="text" name="Author" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input required className='input' placeholder='Price' type="number" name="Price" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input required className='input' placeholder='Year' type="number" name="Year" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input required className='input' placeholder='Stock Available' type="number" name="Stock_available" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input className='input' placeholder='Number of pages' type="number" name="Number_of_pages" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'><input className='input' placeholder='Country of origin ' type="string" name="Country_of_origin" onChange={(e) => handleChange(e)} /></div>
                <div className='input-holder'>
                    <label for="Digital_format_available" className='mr-[10px]'>Digital format available:</label>
                    <select ref={selectRef} name="Digital_format_available"  >
                        <option value="true" > true </option>
                        <option value="false" > false </option>
                    </select>
                </div>
                <div className='input-holder'>
                    <button className='w-full bg-white p-[7px] rounded-[5px]' type="submit">
                        {loading ? <CircularLoader/> : "Submit"}    
                    </button> 
                </div>
            </form>
        </div>
    </div>
  )
}
