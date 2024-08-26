import React from 'react'
import JobRow from './JobRow'

const Jobs = () => {
  return (
    <div className='bg-gray-200 py-4'>
      <div className="container">
        <h2 className='font-bold mb-4 '>Recent jobs</h2>
        <div className="flex flex-col gap-4">
          <JobRow />
          <JobRow />
          <JobRow />
          <JobRow />

        </div>
      </div>
    </div>
  )
}

export default Jobs