import React from "react";
import {BsThreeDots} from 'react-icons/bs'
import './categoryCard.css';


function CategoryCard(props) {
    const { name, hashtag, categoryId} = props
    return (
        <div id="CategoryContainerCard">
            <div id="CategoryContent" onClick={() => {props.setActiveCategoryId(categoryId)}}>
                <h3 id="CategoryName">{name}</h3>
                <h6 id="CategoryHashtag">#{hashtag}</h6>
            </div>
            <div id="CategoryEditButton">
                <BsThreeDots />
            </div>
        </div>
    )
}

export default CategoryCard;