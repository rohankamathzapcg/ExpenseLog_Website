import React from 'react'

const ChartFilter = (props) => {
    return (
        <>
            <div className="filter">
                <a className='icon' href='#icon' data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                </a>
                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow'>
                    <li className='dropdown-header text-start'>
                        <h6>Filter</h6>
                    </li>
                    <hr />
                    <li>
                        <a href="#today" className='dropdown-item' onClick={() => props.filterChange('Today')}>Today</a>
                    </li>
                    <li>
                        <a href="#Month" className='dropdown-item' onClick={() => props.filterChange('This Month')} >This Month</a>
                    </li>
                    <li>
                        <a href="#Year" className='dropdown-item' onClick={() => props.filterChange('This Year')} >This Year</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ChartFilter
