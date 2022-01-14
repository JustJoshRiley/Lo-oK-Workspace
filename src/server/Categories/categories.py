def create_category(name, hashtag, mongo):
    # category object
    new_category_object = {
        "name" : name,
        "hashtag" : hashtag
    }
    if mongo.db.categories.count_documents({"name" : new_category_object["name"]}) > 0:
        return True
    else :
        # add category to collection
        mongo.db.categories.insert_one(new_category_object)
        # find new category object
        new_category = mongo.db.categories.find({"name" : name})
        # return category id
        for category in new_category:
            return category

def update_category(category_id, new_name, new_hashtag, mongo, ObjectId):
    updated_category = {
        "name" : new_name,
        "hashtag" : new_hashtag
    }
    # find category
    existing_category = mongo.db.categories.find({"_id" : ObjectId(category_id)})
    # update category name and hashtag
    for category in existing_category:
        mongo.db.categories.update_one({"_id" : category["_id"]}, {"$set" : {"name" : updated_category["name"]}})
        mongo.db.categories.update_one({"_id" : category["_id"]}, {"$set" : {"hashtag" : updated_category["hashtag"]}})
    return (category["name"] + " has been updated to " + new_name + " and the hashtag has been updated to " + new_hashtag)

def find_all_categories(mongo):
    all_categories = list(mongo.db.categories.find({}))
    return all_categories

def find_category_based_on_id(category_id, mongo, ObjectId):
    category = mongo.db.categories.find({"_id" : ObjectId(category_id)})
    for object in category:
        return object

def delete_category(category_id, mongo, ObjectId):
    has_been_deleted = mongo.db.categories.delete_one({"_id" : ObjectId(category_id)})
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_categories(mongo, ObjectId):
    all_categories = find_all_categories(mongo)
    all_categories_count = len(all_categories)
    for category in all_categories:
        mongo.db.categories.delete_one({"_id" : ObjectId(category["_id"])})
    return(all_categories_count)