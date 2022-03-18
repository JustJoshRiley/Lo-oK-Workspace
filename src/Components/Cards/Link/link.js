import React from "react";
import { BsThreeDots } from "react-icons/bs";
import './link.css';

function LinkCard(props) {
    const {image_url, title, description, url} = props
    return (
        <div id="LinkContainerCard">
            <a target="_blank" href={url}>
                <div id="LinkContent">
                    <img src={image_url}/>
                    <h3 id="LinkName" >{title}</h3>
                    <p id="LinkDescription">{description}</p>
                </div>
            </a>
            <div id="LinkEditButton">
                <BsThreeDots />
            </div>
        </div>
    )
}
export default LinkCard;