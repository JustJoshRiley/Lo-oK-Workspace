def connect_chat_to_workspace(chat_id, workspace_id, mongo):
    chat_workspace = {
        "chat_id" : chat_id,
        "workspace_id" : workspace_id
    }

    if mongo.db.chat_to_workspace.count_documents({"chat_id" : chat_workspace["chat_id"]}) > 0:
        return True
    else :
        mongo.db.chat_to_workspace.insert_one(chat_workspace)
        new_chat_connection = mongo.db.chat_to_workspace.find({"chat_id" : chat_workspace["chat_id"]})
        for chat in new_chat_connection:
            return chat["_id"]

def find_all_chats(mongo):
    all_chats = list(mongo.db.chat_to_workspace.find({}))
    return all_chats

def find_all_chats_for_one_workspace(workspace_id, mongo):
    all_chats_for_workspace = list(mongo.db.chat_to_workspace.find({"workspace_id" : workspace_id}))
    return all_chats_for_workspace

def delete_one_chat_for_one_workspace(workspace_id, chat_id, mongo):
    has_been_deleted = mongo.db.chat_to_workspace.delete_one({"workspace_id" : workspace_id, "chat_id" : chat_id})
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_chats_to_workspace(workspace_id, mongo):
    all_chats = find_all_chats_for_one_workspace(workspace_id, mongo)
    all_chats_count = len(all_chats)
    for chat in all_chats:
        delete_one_chat_for_one_workspace(workspace_id, chat["chat_id"], mongo)
    return(all_chats_count)

def delete_all_chat_connections(mongo, ObjectId):
    all_chats = find_all_chats(mongo)
    all_chats_count = len(all_chats)
    for chat in all_chats:
        mongo.db.chat_to_workspace.delete_one({"_id" :  ObjectId(chat["_id"])})
    return(all_chats_count)