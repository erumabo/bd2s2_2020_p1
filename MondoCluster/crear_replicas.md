# Comandos para crear los containers

Comandos para crear instancias de mongo en contenedores de Docker.
La configuración de las mismas está en `config_replicas.md`.

## Servidores de configuracion

* **Alfa** 172.22.6.104:27017
```bash
docker run -d -p 27017:27017 --ip 172.22.6.104 --name Alfa mongo \
  mongod --port 27017 --configsvr --replSet "alertme_cfg" --dbpath /data/configdb
```

* **Bravo** 172.22.10.26:27017
```bash
docker run -d -p 27017:27017 --name bravo mongo \
  mongod --port 27017 --configsvr --replSet alertme_cfg --dbpath /data/configdb
```

## Shards 

### Replica Moravia

* **Ekko** 172.22.10.26:27022
```bash
docker run -d -p 27022:27022 --name ekko mongo \
  mongod --port 27022 --replSet alertme_moravia --shardsvr
```
* **Foxtrox** 172.22.135.232:27022
```bash
docker run -d -p 27022:27022 --ip 172.22.135.232 --name Foxtrox mongo \
  mongod --port 27022 --shardsvr --replSet alertme_moravia
```
* **Golf** 172.22.124.8:27022
```bash
docker run -d -p 27022 --ip 172.22.124.8 --name Golf mongo \
  mongod --port 27022 --replSet alertme_moravia
```

### Replica Coronado

* **Hotel** 172.22.6.104:27020
```bash
docker run -d -p 27020:27020 --ip 172.22.6.104 --name Hotel  mongo \
  mongod --port 27020 --replSet alertme_coronado
```
* **India** 172.22.135.232:27020
```bash
docker run -d -p 27020:27020 --ip 172.22.135.232 --name India mongo \
  mongod --port 27020 --shardsvr --replSet alertme_coronado
```
* **Juliett** 172.22.124.8:27020
```bash
docker run -d --ip 172.22.124.8 --name Juliett  mongo \
  mongod --port 27020 --shardsvr --replSet "alertme_coronado" 
```

### Replica Cartago

* **Kilo** 172.22.6.104:27021
```bash
docker run -d -p 27021:27021 --ip 172.22.6.104 --name Kilo  mongo \
  mongod  --port 27021 --shardsvr --replSet "alertme_cartago"
```
* **Lima** 172.22.10.26:27021
```bash
docker run -d -p 27021:27021 --name lima mongo \
  mongod --port 27021 --replSet alertme_cartago
```
* **Mike** 172.22.124.8:27021
```bash
docker run -d --ip 172.22.124.8 --name Mike  mongo \
  mongod --port 27021 --shardsvr --replSet "alertme_cartago" 
```

## Routers

* **Charlie** 172.22.135.232:27018
```bash
docker run -d -p 27018:27018 --ip 172.22.135.232 --name Charlie mongo \
  mongos --port 27018 --configdb alertme_cfg/172.22.6.104:27017,172.22.10.26:27017
```

* **Delta** 172.22.124.8:27018
```bash
docker run -d -p 27018:27018 --name Delta mongo \
  mongos --port 27018 --configdb alertme_cfg/172.22.6.104:27017,172.22.10.26:27017 --bind_ip_all
```
