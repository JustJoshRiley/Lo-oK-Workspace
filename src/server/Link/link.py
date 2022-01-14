# evanwall: import requests
import requests

def new_link(url, mongo):
    new_link_object = {
        "url": url,
        "image_url" : "",
        "title" : "",
        "description" : ""
    }

    url_info = f'http://api.linkpreview.net/?key=ac828778cedf797b952be031a0696d6f&q={new_link_object["url"]}'

    url_response = requests.request("POST", url_info)

    url_item_json = url_response.json()

    new_link_object["image_url"] = url_item_json["image"]
    new_link_object["title"] = url_item_json["title"]
    new_link_object["description"] = url_item_json["description"][0:100]

    if mongo.db.links.count_documents({"url" : new_link_object["url"]}) > 0:
        return True
    else :
        mongo.db.links.insert_one(new_link_object)

        new_link_in_collection = mongo.db.links.find({"url" : new_link_object["url"]})
        for link in new_link_in_collection:
            return link

def find_all_links(mongo):
    all_links = list(mongo.db.links.find({}))
    return all_links

def find_link_based_on_id(link_id, mongo, ObjectId):
    link = mongo.db.links.find({"_id" : ObjectId(link_id)})
    for object in link:
        return object

def delete_link(link_id, mongo, ObjectId):
    has_been_deleted = mongo.db.links.delete_one({"_id" : ObjectId(link_id)})
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_links(mongo, ObjectId):
    all_links = find_all_links(mongo)
    all_links_count = len(all_links)
    for link in all_links:
        mongo.db.links.delete_one({"_id" : ObjectId(link["_id"])})
    return(all_links_count)