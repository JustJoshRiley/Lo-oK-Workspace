import React, {useEffect, useState} from "react";
import { BiAddToQueue } from "react-icons/bi";
import CategoryCard from "../../Cards/CategoryCard/categoryCard";
import AddCategoryModal from "../../Modals/AddCategoryModal/addCategoryModal";
import './categoryColumn.css';


function CategoryColumn(props) {
    const [categoryModalShow, setCategoryModalShow] = useState(false);
    const [allCategoriesForWorkspace, setAllCategoriesForWorkspace] = useState();

    const getAllCategoriesForWorkspace = async () => {
        const allCategoriesForWorkspaceResponse = await fetch('/get_all_categories_for_workspace_id', {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            redirect: 'manual',
            body: JSON.stringify(props.activeWorkspaceId)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.map((category) => {
                const {_id, name, hashtag} = category
                return (
                    <CategoryCard 
                        name={name}
                        hashtag={hashtag}
                        categoryId={_id}
                        setActiveCategoryId={props.setActiveCategoryId}
                    />
                )
            })
        }).then((mappedData) => {
            setAllCategoriesForWorkspace(mappedData)
        })
    }
    useEffect(() => {
        getAllCategoriesForWorkspace();

        const getCategoriesTimer = setInterval(getAllCategoriesForWorkspace, 1000)

        return () => {
            clearInterval(getCategoriesTimer)
        }
    }, [props]);
    
    return (
        <div id="Category">
            <AddCategoryModal getAllCategoriesForWorkspace={() => getAllCategoriesForWorkspace()} activeWorkspaceId={props.activeWorkspaceId}  show={categoryModalShow} onHide={() => setCategoryModalShow(false)} />
            <div id="CategoryHeader">
                <div id="CategoryHeaderContent">
                    <p>CATEGORIES</p>
                    <BiAddToQueue id="add" onClick={() => {
                        if (!props.activeWorkspaceId) {
                            alert("Please Select a Workspace before Adding a Category")
                            return <></>
                        }
                        setCategoryModalShow(true)}}/>
                </div>
            </div>
            <div id="CategoryContainer">
                {allCategoriesForWorkspace}
            </div>
        </div>
    )
}
export default CategoryColumn;