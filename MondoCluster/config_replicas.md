# Configuracion de los nodos

## Config

Ejecutar desde una instancia dentro de la replica de config

```javascript
rs.initiate({
  _id:"alertme_cfg",
  configsvr:true,
  members: [
    {_id:0,host:"172.22.10.26:27017"},
    {_id:1,host:"172.22.6.104:27017"}
  ]
})
rs.status()
```

## Shards

Ejecutar desde una instancia dentro de la replica respectiva

### Moravia

```javascript
rs.initiate({
  _id:"alertme_moravia",
  members: [
    {_id:0,host:"172.22.10.26:27019"},
    {_id:1,host:"172.22.135.232:27019"}
  ]
})
```

### Coronado

```javascript
rs.initiate({
  _id:"alertme_coronado",
  members: [
    {_id:0,host:"172.22.135.232:27020"},
    {_id:1,host:"172.22.124.8:27020"}
  ]
})
```

### Cartago

```javascript
rs.initiate({
  _id:"alertme_cartago",
  members: [
    {_id:0,host:"172.22.6.104:27021"},
    {_id:1,host:"172.22.124.8:27021"}
  ]
})
```

## Routers

Ejecutar desde una instancia de la replica de routing

```javascript
sh.addShard( "alertme_moravia/172.22.10.26:27019");
sh.addShard( "alertme_coronado/172.22.135.232:27020");
sh.addShard( "alertme_cartago/172.22.6.104:27021");
sh.status();
```

## Arbitros

Ejecutar comando desde una instancia dentro de la replica respectiva

### Moravia

`rs.addArb("172.22.124.8:27019")`

### Coronado

`rs.addArb("172.22.135.232:27020")`

### Cartago

`rs.addArb("172.22.6.104:27021")`

## Configuracion del Shard

Ejecutar desde una instancia de la replica de router

Indico cual va a ser la base de datos que va a soportar sharding

`sh.enableSharding("alertme");`

Luego el collection y el campo del collection que va servir como shardkey

`sh.shardCollection("alertme.locations", { nombre : "hashed" } );`


### Rangos de shards

[Shard Range Documentation](https://docs.mongodb.com/manual/reference/method/sh.updateZoneKeyRange/#sh.updateZoneKeyRange)

* Zonas

```javascript
sh.addShardToZone("alertme_moravia","Moravia")
sh.addShardToZone("alertme_coronado","Coronado")
sh.addShardToZone("alertme_cartago","Cartago")
```

* Rango Moravia

```javascript
sh.updateZoneKeyRange(
"alertme.locations",
{canton: "Moravia"},
{canton: "Moravia_"},
"Moravia"
)
```

* Rango Coronado

```javascript
sh.updateZoneKeyRange(
"alertme.locations",
{canton: "Coronado"},
{canton: "Coronado_"},
"Coronado"
)
```

* Rango Cartago

```javascript
sh.updateZoneKeyRange(
"alertme.locations",
{canton: "Cartago"},
{canton: "Cartago_"},
"Cartago"
)
```

* Shard Collection

`sh.shardCollection("alertme.locations",  { canton: 1 } );`
