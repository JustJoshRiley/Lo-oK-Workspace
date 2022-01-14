def create_new_user(email, password, username, mongo):
    # create new user object
    new_user = {
        "email" : email,
        "password" : password,
        "username" : username
    }
    # check to see if the email exists in the collection
    if mongo.db.users.count_documents({"email" : new_user["email"]}) > 0:
        return True
    else :
        # add user to users collection
        mongo.db.users.insert_one(new_user)
        # find user object
        new_user_object = mongo.db.users.find({"email" : new_user["email"]})
        #  return new user object id
        for user_object in new_user_object:
            return user_object

# 
# update user object
# 
def update_user_email(user_id, new_email, mongo, ObjectId):
    # find user
    existing_user = mongo.db.users.find({"_id" : ObjectId(user_id)})

    # update the user email
    for user_object in existing_user:
        mongo.db.users.update_one({"_id" : user_object["_id"]}, {"$set" : {"email" : new_email}})
    return (user_object["email"] + " has been updated to " + new_email)


def update_user_password(user_id, new_password, mongo, ObjectId):
    existing_user = mongo.db.users.find({"_id" : ObjectId(user_id)})

    # update user password
    for user_object in existing_user:
        mongo.db.users.update_one({"_id" : user_object["_id"]}, {"$set" : {"password" : new_password}})
    return True


def update_user_username(user_id, new_username, mongo, ObjectId):
    existing_user = mongo.db.users.find({"_id" : ObjectId(user_id)})

    # update user username
    for user_object in existing_user:
        mongo.db.users.update_one({"_id" : user_object["_id"]}, {"$set" : {"username" : new_username}})
    return (user_object["username"] + " has been updated to " + new_username)

def find_all_users(mongo):
    all_users = list(mongo.db.users.find({}))
    return all_users

def find_one_user(email, mongo):
    existing_user = mongo.db.users.find({"email" : email})
    for user_obj in existing_user:
        return user_obj


def login_user(email, password, mongo):
    existing_user = find_one_user(email, mongo)
    if existing_user["password"] == password:
        return existing_user
    else :
        return False


def delete_user(user_id, mongo, ObjectId):
    has_been_deleted = mongo.db.users.delete_one({"_id" : ObjectId(user_id) })
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False