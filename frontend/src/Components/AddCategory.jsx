import React from 'react'

const AddCategory = () => {
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
                                <input type="text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }} className="form-control shadow-none" placeholder="Enter category name" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" style={{ backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory
