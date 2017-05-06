'use strict';

var Objetos = require('./Objects.js');
var Personajes = require('./Entidades.js');

var ObjectPhysical = Objetos.ObjectPhysical;

//var Rocket = Objetos.Rocket;
var Llave = Objetos.Llave;
var NPC = Objetos.NPC;
var Monje = Objetos.Monje;
//var Flag = Objetos.Flag;


var Entity= Personajes.Entity;
var Player= Personajes.Player;
//var Enemy= Personajes.Enemy;

function BuildMap(game)
{
    this.game = game;

    this.createTilemap();
        
    this.createPlayer();

      //  var enemy = new Personajes.Enemy(this.game,210,750);


       // this.enemies = this.game.add.group();
     //this.enemies.add(enemy);
   

        //this.game.world.addChild(this.enemies);
    this.createKeys();

    this.createNPCs();


       // this.musica = this.game.add.audio('musica1');
       // this.musica.loop = true;
       // this.musica.play();



    //game.groundLayer.resizeWorld(); //resize world and adjust to the screen

};

BuildMap.prototype.createTilemap = function(){
  //Cargamos el tilemap en el map
    this.game.map =  this.game.add.tilemap('tilemap1');

    //Asignamos al tileset 'patrones' la imagen de sprites tiles
    //patrones es lo de tiled y tiles, el nombre que tu le das en el main
    this.game.map.addTilesetImage('tileset','tiles');
    this.game.map.addTilesetImage('tileset_añadidos','tiles');

    //Creacion de las layers
    this.game.suelo = this.game.map.createLayer('Suelo');
    this.game.colisiones = this.game.map.createLayer('Paredes');
    this.game.sillasDelante= this.game.map.createLayer('sillas por delante');
    this.game.sillasDetras= this.game.map.createLayer('sillas por detras');
    this.game.objCol= this.game.map.createLayer('objetos colisionables');
    this.game.objNoCol= this.game.map.createLayer('Objetos no colisionables');
    this.game.pAlmacen= this.game.map.createLayer('PuertaAlmacen');
    this.game.objetos= this.game.map.createLayer('Objetos');

    //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
    this.game.map.setCollisionBetween(1, 500, true, 'Paredes');
    this.game.map.setCollisionBetween(1, 500, true, 'objetos colisionables');
    this.game.map.setCollisionBetween(1, 500, true, 'PuertaAlmacen');


    //Limites de colisiones
    this.game.world.setBounds(0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);//Límite del mundo
};

BuildMap.prototype.createPlayer = function(){
    this.player = new Personajes.Player(this.game,300,300);
            this.player.scale.setTo(2.1,2.1);

    this.game.world.addChild(this.player);

};

BuildMap.prototype.createKeys = function(){
    
    var callback = function(){
         console.log("adriana te quiero");
    };
        
    var llave = new Llave(this.game,500,300,'player',callback);

    this.llaves = this.game.add.group();

    this.llaves.add(llave);


    callback = function(){
        this.game.estado.alimento1 = true;
    };

    var alimento1 = new Llave(this.game,600,400,'player',callback);

    this.llaves.add(alimento1);

    callback = function(){
        this.game.estado.alimento2 = true;
    };

    var alimento2 = new Llave(this.game,600,550,'player',callback);

    this.llaves.add(alimento2);

    callback = function(){
        this.game.estado.alimento3 = true;
    };

    var alimento3 = new Llave(this.game,600,650,'player',callback);

    this.llaves.add(alimento3);


    this.game.world.addChild(this.llaves);
};

BuildMap.prototype.createNPCs = function(){
    var texti = ["hola", "adios"];
    var paco = new Monje(this.game,300,600,'player', texti);

    this.NPCs = this.game.add.group();

    this.NPCs.add(paco);

    this.game.world.addChild(this.NPCs);
};


BuildMap.prototype.getColisionLayer = function(){
    return this.game.colisiones;
};
BuildMap.prototype.getObjColisionLayer = function(){
    return this.game.objCol;
};




BuildMap.prototype.update_ = function(){

    this.player.update_();
    /*
    this.enemies.forEach(function(enemy) {
        enemy.updateEnemy_();
    });
*/
}

BuildMap.prototype.destroy = function()
{
    //ENTIDADES
    this.player.destroy();
    //this.enemies.destroy();
    this.llaves.destroy();
    this.NPCs.destroy();

    //LAYERS

    this.game.fondo.destroy();

   // this.musica.destroy();

    //MAPA
    this.game.map.destroy();
};

module.exports = BuildMap;