import { Search } from 'lucide-react'
import React from 'react'
import SparklesText from '../../../components/magicui/SparklesText'
import { PlaceholdersAndVanishInputDemo } from '@/components/PlaceholdersAndVanishInputDemo'

function SearchSection({onSearchInput}:any){
  return (
    <div className='p-10  flex flex-col justify-center items-center text-black'>
        <SparklesText text="Browse All Templates" />;

        <div className='w-full flex justify-center' >
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
                <Search className='text-primary' />
                <input type='text' placeholder='Search' 
                onChange={(event)=>onSearchInput(event.target.value)}
                className='bg-transparent w-full outline-none text-black' />
            </div>
        </div>
    </div>
  )
}

export default SearchSection