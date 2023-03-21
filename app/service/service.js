let service = {};

service.save = (item) => {
    return item.save();
};

service.find = (collection, search) => {
    return collection.find(search);
};

service.findOne = (collection, search, projection = {}) => {
    return collection.findOne(search, projection);
};

service.findOneAndUpdate = (collection, search, change) => {
    return collection.findOneAndUpdate(search, change, { upsert: true, new: true });
};

service.findOneAndDelete = (collection, search) => {
    return collection.findOneAndDelete(search);
};

module.exports = service;
