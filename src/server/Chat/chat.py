def add_new_chat_message(message, user_id, mongo):
    # message 
    # evanwall: maybe add timestamp to order messages by
    new_message = {
        "message" : message,
        "user_id" : user_id
        #"timestamp": time.time()
    }
    message = mongo.db.chat.insert_one(new_message)

    new_chat = mongo.db.chat.find({"_id" : message.inserted_id})
    for chat in new_chat:
        return chat

def find_all_messages(mongo):
    all_messages = list(mongo.db.chat.find({}))
    return all_messages

def find_message_based_on_id(message_id, mongo, ObjectId):
    message = mongo.db.chat.find({"_id" : ObjectId(message_id)})
    for object in message:
        return object

def delete_chat_message(chat_id, mongo, ObjectId):
    has_been_deleted = mongo.db.chat.delete_one({"_id" : ObjectId(chat_id)})
    deleted_value = 1
    if has_been_deleted.deleted_count == deleted_value:
        return True
    else :
        return False

def delete_all_chat_messages(mongo, ObjectId):
    all_messages = find_all_messages(mongo)
    all_messages_count = len(all_messages)
    for message in all_messages:
        mongo.db.chat.delete_one({"_id" : ObjectId(message["_id"])})
    return(all_messages_count)