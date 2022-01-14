def connect_link_to_category(link_id, category_id, mongo):
    link_category = {
        "link_id" : link_id,
        "category_id" : category_id
    }

    if mongo.db.link_to_category.count_documents({"link_id" : link_category["link_id"]}) > 0:
        return True
    else :
        mongo.db.link_to_category.insert_one(link_category)
        new_connection = mongo.db.link_to_category.find({"link_id" : link_category["link_id"]})
        for link in new_connection:
            return link

def find_all_links_for_all_categories(mongo):
    all_links = list(mongo.db.link_to_category.find({}))
    return all_links

def find_all_links_for_one_category(category_id, mongo):
    all_links_for_category = list(mongo.db.link_to_category.find({"category_id" : category_id}))
    return all_links_for_category

def delete_one_link_for_one_category(category_id, link_id, mongo):
    has_been_deleted = mongo.db.link_to_category.delete_one({"category_id" : category_id, "link_id" : link_id})
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_links_to_category(category_id, mongo):
    all_links = find_all_links_for_one_category(category_id, mongo)
    all_links_count = len(all_links)
    for link in all_links:
        delete_one_link_for_one_category(category_id, link["link_id"], mongo)
    return(all_links_count)

def delete_all_link_connections(mongo, ObjectId):
    all_links = find_all_links_for_all_categories(mongo)
    all_links_count = len(all_links)
    for link in all_links:
        mongo.db.link_to_category.delete_one({"_id" :  ObjectId(link["_id"])})
    return(all_links_count)