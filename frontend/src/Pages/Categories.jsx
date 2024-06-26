import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import AddCategory from '../Components/AddCategory';
import axios from 'axios'

const Categories = () => {
    const [myCategory, setMyCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const isSelected = (category) => myCategory.includes(category);

    const handleCategoryClick = (category) => {
        if (isSelected(category)) {
            setMyCategory(myCategory.filter((cat) => cat !== category));
        } else {
            setMyCategory([...myCategory, category]);
        }
    };

    useEffect(() => {
        axios.get("https://localhost:7026/api/Category")
            .then((result) => {
                setCategories(result.data)
            })
            .catch(err => console.log(err))
    })

    return (
        <>
            <ToastContainer />
            <AddCategory />
            <main id="main" className='main'>
                <div className='pagetitle'>
                    <h1>Expense Categories</h1>
                </div>
                <div className="container mt-5 mx-0">
                    {myCategory.length > 0 && (
                        <div className="row border rounded shadow-sm border">
                            <div className="col p-3">
                                <span className='text-start headings-side'>My Categories</span>
                                <div className='mt-3'>
                                    {myCategory.map((category, index) => (
                                        <span key={index} className='background-badge-selected badge p-2 me-2'>{category}</span>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" style={{ border: "1px solid #012970", backgroundColor: 'white', color: '#012970', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn">Save changes</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {categories && (
                        <div className="row border rounded shadow-sm border mt-3">
                            <div className="col p-3">
                                <span className='text-start headings-side'>Expense Categories</span>
                                <div className='mt-3'>
                                    {categories.map((category, index) => (
                                        <span
                                            key={index}
                                            className={`badge p-2 me-2 ${isSelected(category.categoryName) ? 'background-badge-selected text-white' : 'background-badge text-badge'}`}
                                            onClick={() => handleCategoryClick(category.categoryName)}
                                            style={{ cursor: 'pointer' }}>{category.categoryName}</span>
                                    ))}
                                    <button type="button" className="btn" style={{ backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default Categories
