from asyncio import FastChildWatcher
from flask import Flask, send_from_directory, request

from flask_pymongo import PyMongo

from bson.objectid import ObjectId

from flask_cors import CORS


import json


# workspaces
from src.server.Workspaces.workspaces import *

# users
from src.server.Users.users import *

# categories
from src.server.Categories.categories import *

# chat
from src.server.Chat.chat import *

# link
from src.server.Link.link import *

# Collection Connections
# Workspace to Category
from src.server.CollectionConnections.workspace_to_category import *

# Link to Category
from src.server.CollectionConnections.link_to_category import *

# User to Workspace
from src.server.CollectionConnections.user_to_workspace import *

# Chat to Workspace
from src.server.CollectionConnections.chat_to_workspace import *

app = Flask(__name__, static_url_path='', static_folder='build')
CORS(app)

app.config["MONGO_URI"] = "mongodb://root:thisisSparta!@srv-captain--look-database/mydatabase?authSource=admin"
# app.config["MONGO_URI"] = "mongodb://localhost:27017/db"
mongo = PyMongo(app)


# one route roughly maps to one-ish user-facing operations
# and may include multiple db operations (already implemented)

@app.route('/', methods=["GET"])
def hompage():
    return send_from_directory(app.static_folder, 'index.html')

# Signup User Route
@app.route('/signup_user', methods=['POST'])
def add_new_user_route():
    new_user_data_dict = request.get_json()
    new_user_object = create_new_user(new_user_data_dict["email"], new_user_data_dict["password"], new_user_data_dict["username"], mongo)
    if new_user_object == True:
        return_dict = {"response" : True}
        return return_dict
    else :
        return_dict = {
            "_id" : str(new_user_object["_id"]),
            "email" : new_user_object["email"],
            "username" : new_user_object["username"],
            "response" : True
        }
        return_dict_json = json.dumps(return_dict)
        return return_dict_json

# Login User Route
@app.route('/login_user', methods=['POST'])
def login_user_route():
    existing_user_data_dict = request.get_json()
    existing_user = login_user(existing_user_data_dict["email"], existing_user_data_dict["password"], mongo)
    print(existing_user)
    if existing_user == False :
        return_dict = {'response' : False}
        return_dict_json = json.dumps(return_dict)
        # print(return_dict_json)
        return return_dict_json
    else :
        return_dict = {
            "response" : True,
            "username" : existing_user["username"], 
            "email" : existing_user["email"], 
            "_id" : str(existing_user["_id"])
            }
        return_dict_json = json.dumps(return_dict)
        # print(return_dict_json)
        return return_dict_json

# Add New Workspace Route
@app.route('/add_new_workspace', methods=['POST'])
def add_new_workspace_route():
    new_workspace_dict = request.get_json()
    user_id_from_cookies = new_workspace_dict["user_id"]
    new_workspace = create_workspace(new_workspace_dict["name"], new_workspace_dict["hashtag"], mongo)
    if new_workspace == True:
        return_dict = {"response" : True}
        return return_dict
    else :
        # print(new_workspace)
        return_dict = {
            "name" : new_workspace_dict["name"],
            "hashtag" : new_workspace_dict["hashtag"],
            "_id" : str(new_workspace["_id"]),
            "response" : False
        }
        # print(return_dict)
        # connect user to the workspace
        connect_user_to_workspace(user_id_from_cookies, return_dict["_id"], mongo)
        return_dict_json = json.dumps(return_dict)
        # print(connect_user_to_workspace_object)
        return return_dict_json

# Find all workspaces for user_id
@app.route('/get_all_workspaces_for_user', methods=['POST'])
def get_all_workspaces_for_user_id_route():
    user_id = request.get_json()
    
    all_workspaces_for_user_list = []

    all_user_links_to_workspace = find_all_workspaces_for_one_user(user_id, mongo)
    for link in all_user_links_to_workspace:
        workspace_object = find_workspace_from_workspace_id(link["workspace_id"], mongo, ObjectId)
        workspace_dict = {
            "name" : workspace_object["name"],
            "hashtag" : workspace_object["hashtag"],
            "_id" : str(workspace_object["_id"])
        }
        all_workspaces_for_user_list.append(workspace_dict)
    
    all_workspaces_dict = json.dumps(all_workspaces_for_user_list)
    # print(all_workspaces_dict)
    return all_workspaces_dict

# Add New Category Route
@app.route('/add_new_category' , methods=['POST'])
def add_new_category_route():
    new_category_dict = request.get_json()
    new_category = create_category(new_category_dict["name"], new_category_dict["hashtag"], mongo)
    
    if new_category == True:
        return_dict = {"response" : True}
        return return_dict
    else :
        return_dict = {
            "name" : new_category_dict["name"],
            "hashtag" : new_category_dict["hashtag"],
            "_id" : str(new_category["_id"]),
            "response" : False
        }
        return_dict_json = json.dumps(return_dict)
        # connect category to workspace
        connect_workspace_to_category(new_category_dict["workspace_id"], return_dict["_id"], mongo)
        return return_dict_json
        

# find all categories for workspace_id
@app.route('/get_all_categories_for_workspace_id', methods=["POST"])
def get_all_categories_for_workspace_id_route():
    workspace_id = request.get_json()

    all_categories_for_workspace = []

    all_category_links_to_workspace = find_all_categories_for_one_workspace(workspace_id, mongo)
    for link in all_category_links_to_workspace:
        category_object = find_category_based_on_id( link["category_id"], mongo, ObjectId)
        category_dict = {
            "name" : category_object["name"],
            "hashtag" : category_object["hashtag"],
            "_id" : str(category_object["_id"])
        }
        all_categories_for_workspace.append(category_dict)
    all_categories_dict = json.dumps(all_categories_for_workspace)
    # print(all_categories_dict)
    return all_categories_dict

# Add New Link
@app.route('/add_new_link', methods=["POST"])
def add_new_link_route():
    new_link_dict = request.get_json()
    new_link_response = new_link(new_link_dict["link"], mongo)

    if new_link_response == True:
        return_dict = {"response" : True}
        return return_dict
    else :
        return_dict = {
            "url" : new_link_dict["link"],
            "title" : new_link_response["title"],
            "description" : new_link_response["description"],
            "image_url" : new_link_response["image_url"],
            "_id" : str(new_link_response["_id"]),
            "response" : False
        }
        return_dict_json = json.dumps(return_dict)
        connect_link_to_category(return_dict["_id"], new_link_dict["category_id"], mongo)
        return return_dict_json

# Get All Links for One Category
@app.route('/get_all_links_for_category', methods=["POST"])
def get_all_links_for_category_id_route():
    category_id = request.get_json()
    # print(category_id)

    all_links_for_category = []

    all_links_to_category = find_all_links_for_one_category(category_id, mongo)
    for link in all_links_to_category:
        link_object = find_link_based_on_id(link["link_id"], mongo, ObjectId)
        link_dict = {
            "url" : link_object["url"],
            "title" : link_object["title"],
            "description" : link_object["description"],
            "_id" : str(link_object["_id"])
        }
        all_links_for_category.append(link_dict)
    all_links_dict = json.dumps(all_links_for_category)
    print(all_links_dict)
    return all_links_dict

# Add new message to workspace
@app.route('/add_new_message', methods=["POST"])
def add_new_message_route():
    new_chat_dict = request.get_json()
    print(new_chat_dict)

    new_chat_response = add_new_chat_message(new_chat_dict['message'], new_chat_dict["user_id"], mongo)

    return_dict = {
        "message" : new_chat_response["message"],
    }
    return_dict_json = json.dumps(return_dict)
    connect_chat_to_workspace(str(new_chat_response["_id"]), new_chat_dict["workspace_id"], mongo)
    return return_dict_json

# Get all messages for workspace
@app.route('/get_all_messages_for_workspace', methods=["POST"])
def get_all_messages_for_workspace_route():
    workspace_id = request.get_json()

    all_messages_for_workspace = []

    all_messages_to_workspace = find_all_chats_for_one_workspace(workspace_id, mongo)
    for message in all_messages_to_workspace:
        message_object = find_message_based_on_id(message["chat_id"], mongo, ObjectId)
        username = find_user_by_user_id(message_object["user_id"], mongo, ObjectId)
        message_dict = {
            "message" : message_object["message"],
            "username" : username["username"]
        }
        all_messages_for_workspace.append(message_dict)
    all_messages_dict = json.dumps(all_messages_for_workspace)
    print(all_messages_dict)
    return all_messages_dict

# invite user to workspace
@app.route('/invite_user_to_workspace', methods=["POST"])
def invite_user_to_workspace():
    invite_user_dict = request.get_json()

    user_obj = find_one_user(invite_user_dict["email"], mongo)
    if user_obj == None:
        return_dict = {"response" : False}
        return_dict_json = json.dumps(return_dict)
        return return_dict_json
    else :
        return_dict = {
            "response" : True,
            "user_id" : str(user_obj["_id"]),
        }
        connect_user_to_workspace(return_dict["user_id"], invite_user_dict["workspace_id"], mongo)
        added_user_dict = json.dumps(return_dict)
        return added_user_dict

# delete workspace by Id
@app.route('/delete_workspace_by_id', methods=["POST"])
def delete_workspace_by_id_route():
    workspace_id_dict = request.get_json()
    has_been_deleted = delete_workspace(workspace_id_dict, mongo, ObjectId)
    if has_been_deleted == True:
        all_workspace_category_connections = find_all_categories_for_one_workspace(workspace_id_dict, mongo)
        for connection in all_workspace_category_connections:
            all_links_to_category = find_all_links_for_one_category(connection["category_id"], mongo)
            for link in all_links_to_category:
                delete_link(link["link_id"], mongo, ObjectId)
            all_chats_to_workspace = find_all_chats_for_one_workspace(workspace_id_dict, mongo)
            for chat in all_chats_to_workspace:
                delete_chat_message(chat["chat_id"], mongo, ObjectId)
            delete_all_links_to_category(connection["category_id"], mongo)
            delete_category(connection["category_id"], mongo, ObjectId)
        delete_all_chats_to_workspace(workspace_id_dict, mongo)
        delete_all_workspace_to_category(workspace_id_dict, mongo)
        delete_all_users_to_workspace(workspace_id_dict, mongo)
        return_dict = {"response" : True}
        return_dict_json = json.dumps(return_dict)
        return return_dict_json
    else :
        return_dict = {"response" : False}
        return_dict_json = json.dumps(return_dict)
        return return_dict_json

# Self Destruct
def delete_everything():
    # delete all workspaces
    delete_all_workspaces(mongo, ObjectId)
    # delete all links
    delete_all_links(mongo, ObjectId)
    # delete all chat messages
    delete_all_chat_messages(mongo, ObjectId)
    # dlete all categories
    delete_all_categories(mongo, ObjectId)
    # delete all workspace category connections
    delete_all_workspaces_category_connection(mongo, ObjectId)
    # delete all user workspace connections
    delete_all_users_to_workspace_connections(mongo, ObjectId)
    # delete all link category connections
    delete_all_link_connections(mongo, ObjectId)
    # delete all chat workspace connections
    delete_all_chat_connections(mongo, ObjectId)



if __name__ == '__main__':
    app.run(host="localhost",debug=True)