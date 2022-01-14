import React, {useEffect, useState} from 'react';
import { BiAddToQueue } from "react-icons/bi";
import './linkColumn.css';
import AddLinkModal from '../../Modals/AddLinkModal/addLinkModal';
import LinkCard from '../../Cards/Link/link';

function LinkColumn(props) {
    const [linkModalShow, setLinkModalShow] = useState(false);

    const [allLink, setAllLinks] = useState();

    const getAllLinksForCategory = async () => {
        const allLinksResponse = await fetch('/get_all_links_for_category', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            redirect: 'manual',
            body: JSON.stringify(props.activeCategoryId)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.map((link) => {
                const {url, title, description, imageUrl} = link
                return (
                    <LinkCard
                        image_url={imageUrl}
                        title={title}
                        description={description}
                        url={url}
                    />
                )
            })
        }).then((mappedData) => {
            setAllLinks(mappedData)
        })
    }
    useEffect(() => {
        getAllLinksForCategory();
        
        const getLinksTimer = setInterval(getAllLinksForCategory, 1000)

        return () => {
            clearInterval(getLinksTimer)
        }
    }, [props]);


    return (
        <div id='Link'>
            <AddLinkModal getAllLinksForCategory={() => getAllLinksForCategory()} activeCategoryId={props.activeCategoryId} show={linkModalShow} onHide={() => setLinkModalShow(false)}/>
            <div id='LinkHeader'>
                <div id='LinkHeaderContent'>
                    <p>LINKS</p>
                    <BiAddToQueue id='add' 
                    onClick={() =>  {
                        if (!props.activeCategoryId) {
                            alert("Please Select a Category before Adding a Link")
                            return <></>
                        }
                        setLinkModalShow(true)}} />
                </div>
            </div>
            <div id='LinkContainer'>
                {allLink}
            </div>
        </div>
    )
}
export default LinkColumn;