def create_workspace(name, hashtag, mongo):
    # create new object
    new_workspace = {
            "name":name,
            "hashtag":hashtag
        }
    # check to see if name exists in workspace collection
    if mongo.db.workspace.count_documents({"name": new_workspace["name"]}) > 0:
        return True
    else :
        # add object to workspace collection
        mongo.db.workspace.insert_one(new_workspace)
        # find new workspace object
        new_workspace_object = mongo.db.workspace.find({"name" : name})
        # return new workspace object id
        for object in new_workspace_object:
            return object

# def find_workspace(workspace_id, mongo):
#     return None

def update_workspace(workspace_id, new_name, new_hashtag, mongo, ObjectId):
    # updated workspace object
    updated_workspace = {
            "name":new_name,
            "hashtag":new_hashtag
        }
    # find workspace
    existing_workspace = mongo.db.workspace.find({"_id" : ObjectId(workspace_id)})
    # update object @ name & hashtag
    for object in existing_workspace:
        mongo.db.workspace.update_one({"_id" : object["_id"]}, {"$set" : {"name" : updated_workspace["name"]} })
        mongo.db.workspace.update_one({"_id" : object["_id"]}, {"$set" : {"hashtag" : updated_workspace["hashtag"]} })
    return (object["name"] + " has been updated to " + new_name + " and the hashtag has been updated to " + new_hashtag)


def find_all_workspaces(mongo):
    all_workspaces = list(mongo.db.workspace.find({}))
    return all_workspaces


def find_workspace_from_workspace_id(workspace_id, mongo, ObjectId):
    workspace = mongo.db.workspace.find({"_id" : ObjectId(workspace_id) })
    for object in workspace:
        return object


def delete_workspace(workspace_id, mongo, ObjectId):
    has_been_deleted = mongo.db.workspace.delete_one({"_id" : ObjectId(workspace_id) })
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_workspaces(mongo, ObjectId):
    all_workspaces = find_all_workspaces(mongo)
    all_workspaces_count = len(all_workspaces)
    for workspace in all_workspaces:
        mongo.db.workspace.delete_one({"_id" :  ObjectId(workspace["_id"])})
    return(all_workspaces_count)