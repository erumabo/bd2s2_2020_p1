#docker run -d -p 27017:27017 --name bravo mongo mongod --port 27017 --configsvr --replSet alertme_cfg --dbpath /data/configdb
#docker run -d -p 27022:27022 --name ekko mongo mongod --port 27022 --replSet alertme_moravia --shardsvr
#docker run -d -p 27021:27021 --name lima mongo mongod --port 27021 --replSet alertme_cartago
