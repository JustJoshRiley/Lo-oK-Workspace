def connect_user_to_workspace(user_id, workspace_id, mongo):
    # evanwall: maybe have an is_owner
    user_workspace = {
        "user_id" : user_id,
        "workspace_id" :  workspace_id,
        # "is_owner": bool
    }
    if mongo.db.user_to_workspace.count_documents({"user_id" : user_workspace["user_id"], "workspace_id" : user_workspace["workspace_id"]}) > 0:
        return True
    else :
        mongo.db.user_to_workspace.insert_one(user_workspace)
        new_user_connection = mongo.db.user_to_workspace.find({"user_id" : user_workspace["user_id"], "workspace_id" : workspace_id})
        for user_workspace_connection in new_user_connection:
            return user_workspace_connection

def find_all_users_for_all_workspaces(mongo):
    all_users = list(mongo.db.user_to_workspace.find({}))
    return all_users


def find_all_workspaces_for_one_user(user_id, mongo):
    all_users_for_one_workspace = list(mongo.db.user_to_workspace.find({"user_id" : user_id}))
    return all_users_for_one_workspace

def find_all_users_for_one_workspace(workspace_id, mongo):
    all_users_for_workspace = list(mongo.db.user_to_workspace.find({"workspace_id" : workspace_id}))
    return all_users_for_workspace

def delete_one_user_for_one_workspace(user_id, workspace_id, mongo):
    has_been_deleted = mongo.db.user_to_workspace.delete_one({"user_id" : user_id, "workspace_id": workspace_id})
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_users_to_workspace(workspace_id, mongo):
    all_users = find_all_users_for_one_workspace(workspace_id,mongo)
    all_users_count = len(all_users)
    for user in all_users:
        delete_one_user_for_one_workspace(user["user_id"], workspace_id, mongo)
    return(all_users_count)

def delete_all_users_to_workspace_connections(mongo, ObjectId):
    all_connections = find_all_users_for_all_workspaces(mongo)
    all_connections_count = len(all_connections)
    for user in all_connections:
        mongo.db.user_to_workspace.delete_one({"_id" :  ObjectId(user["_id"])})
    return(all_connections_count)