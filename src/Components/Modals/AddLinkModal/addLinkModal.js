import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';

function AddLinkModal(props) {
    const [link, setLink] = useState()

    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>
                    Add a Link
                </Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                        <label for="link_url">Link Url:
                            <input onChange={e => setLink(e.target.value)} value={link} id="link_url" name="category_name" type="url" required aria_required="true"/>
                        </label>
                </Modal.Body>
                <Modal.Footer>
                    <button
                    onClick={async (event) => {
                        event.preventDefault();
                        const new_link = {
                            "link" : link,
                            "category_id" : props.activeCategoryId
                        };
                        const response = await fetch('/add_new_link', {
                            method : "POST",
                            headers : {
                                'Content-Type' : 'application/json'
                            },
                            redirect: 'manual',
                            body: JSON.stringify(new_link)
                        })
                        .then((response) => {
                            response.json()
                            .then(data => {
                                if(data["response"] === true) {
                                    console.log(data)
                                    alert("Already exists in the workspace")
                                } else {
                                    console.log(data)
                                    props.onHide()
                                }
                            })
                        })
                        .then(() => {
                            return props.getAllLinksForCategory()
                        })
                        .catch((error) => {
                            alert(error)
                        });
                    }}
                    >Submit!</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default AddLinkModal;