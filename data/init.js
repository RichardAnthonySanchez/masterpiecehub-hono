db = db.getSiblingDB("mydb");
const data = cat("/docker-entrypoint-initdb.d/data.json");
const docs = JSON.parse(data);
db.mycollection.insertMany(docs);
