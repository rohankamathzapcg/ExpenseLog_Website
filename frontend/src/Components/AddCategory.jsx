import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddCategory = () => {
    const [newCategory, setNewCategory] = useState({
        categoryId: 0,
        categoryName: ""
    })

    const handleAddCategory = () => {
        axios.post("https://localhost:7026/api/Category/Add", newCategory)
            .then((result) => {
                if (result.status === 201) {
                    toast.success("New Category added successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                } else {
                    toast.error("Some error occured", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <div class="modal fade" id="addCategoryModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="categoryModalLabel">Add New Category</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }}>Category Name</span>
                                <input type="text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }} className="form-control shadow-none" placeholder="Enter category name" value={newCategory.categoryName} onChange={(e) => setNewCategory({...newCategory,categoryName:e.target.value})} />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" style={{ backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={handleAddCategory}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory
