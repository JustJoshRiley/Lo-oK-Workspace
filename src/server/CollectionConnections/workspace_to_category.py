# import ObjectId here and use it

def connect_workspace_to_category(workspace_id, category_id, mongo):
    # create object
    workspace_category = {
        "workspace_id" : workspace_id,
        "category_id" : category_id
    }

    if mongo.db.workspace_to_category.count_documents({"category_id" : workspace_category["category_id"]}) > 0:
        return True
    else :
        # add to collection
        mongo.db.workspace_to_category.insert_one(workspace_category)
        new_connection = mongo.db.workspace_to_category.find({"category_id" : workspace_category["category_id"]})
        # return id
        for connection in new_connection:
            return connection

def find_all_entries(mongo):
    all_entries = list(mongo.db.workspace_to_category.find({}))
    return all_entries

def find_all_categories_for_one_workspace(workspace_id, mongo):
    all_entries_for_workspace = list(mongo.db.workspace_to_category.find({"workspace_id" : workspace_id}))
    return all_entries_for_workspace

def delete_one_category_from_workspace(category_id, workspace_id, mongo):
    has_been_deleted = mongo.db.workspace_to_category.delete_one({"category_id" : category_id, "workspace_id" : workspace_id })
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_workspace_to_category(workspace_id, mongo):
    all_entries = find_all_categories_for_one_workspace(workspace_id, mongo)
    all_entries_count = len(all_entries)
    for entry in all_entries:
        delete_one_category_from_workspace(entry["category_id"], workspace_id, mongo)
    return(all_entries_count)

def delete_all_workspaces_category_connection(mongo, ObjectId):
    all_workspaces = find_all_entries(mongo)
    all_workspaces_count = len(all_workspaces)
    for workspace in all_workspaces:
        mongo.db.workspace_to_category.delete_one({"_id" :  ObjectId(workspace["_id"])})
    return(all_workspaces_count)