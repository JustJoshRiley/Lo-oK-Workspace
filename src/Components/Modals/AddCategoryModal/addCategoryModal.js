import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AddCategoryModal(props) {

    const [categoryName, setCategoryName] = useState()
    const [categoryHashtag, setCategoryHashtag] = useState()
    
    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header closeButton closeVariant='black'>
                <Modal.Title>
                    Create a Category
                </Modal.Title>
            </Modal.Header>
                <Modal.Body  dialogClassName="modal-body">
                    <form className='form'>
                        <label for="category_name">Category Name:  </label>
                        <input className="input" onChange={e => setCategoryName(e.target.value)} value={categoryName} id="category_name" name="category_name" type="text" required aria_required="true"/>
                        <label for="category_hashtag">Category Hashtag: </label>
                        <input className="input" onChange={e => setCategoryHashtag(e.target.value)} value={categoryHashtag} id="category_hashtag" name="category_hashtag" type="text" required aria_required="true"/>
                        <button className='button'
                        onClick={async (event) => {
                            event.preventDefault();
                            const new_category = {
                                "name" : categoryName,
                                "hashtag" : categoryHashtag,
                                "workspace_id" : props.activeWorkspaceId
                            };
                            const response = await fetch('/add_new_category', {
                                method : "POST",
                                headers: {
                                    'Content-Type' :'application/json'
                                },
                                redirect: 'manual',
                                body: JSON.stringify(new_category)
                            })
                            .then((response) => {
                                response.json()
                                .then(data => {
                                    if (data["response"] === true) {
                                        console.log(data)
                                        alert("Already exists in the workspace")
                                    } else {
                                        console.log(data)
                                        props.onHide()
                                    }
                                })
                            })
                            .then(() => {
                                return props.getAllCategoriesForWorkspace()
                            })
                            .catch((error) => {
                                alert(error)
                            });
                        }}>Submit!</button>
                    </form>
                </Modal.Body>
        </Modal>
    )
}
export default AddCategoryModal;