'use strict';

var Objetos = require('./Objects.js');
var Personajes = require('./Entidades.js');

var ObjectPhysical = Objetos.ObjectPhysical;

//var Rocket = Objetos.Rocket;
var Llave = Objetos.Llave;
var NPC = Objetos.NPC;
//var Flag = Objetos.Flag;


var Entity= Personajes.Entity;
var Player= Personajes.Player;
var Enemy= Personajes.Enemy;
var Guardia= Personajes.Guardia;

function BuildMap(game)
{
    this.game = game;

    this._actualizaGuardias = false;
    
    this.createTilemap();
    this.createPlayer();
    this.createObjNoCol();
    

    
    this.createKeys();

    this.createNPCs();

    this.musica = this.game.add.audio('musicaJuego');
    this.musica.loop = true;
    this.musica.play();



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
    this.game.sueloPatio= this.game.map.createLayer('Suelo patio');
    this.game.aguaLayer = this.game.map.createLayer('Agua');
    this.game.puertaPrincipalLayer = this.game.map.createLayer('Puerta Principal');
    this.game.salidaLayer = this.game.map.createLayer('Salida');


    //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
    this.game.map.setCollisionBetween(1, 500, true, 'Paredes');
    this.game.map.setCollisionBetween(1, 500, true, 'objetos colisionables');
    this.game.map.setCollisionBetween(1, 500, true, 'Agua');
    this.game.map.setCollisionBetween(1, 500, true, 'Puerta Principal');
    this.game.map.setCollisionBetween(1, 500, true, 'Salida');

    //Limites de colisiones
    this.game.world.setBounds(0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);//Límite del mundo
};

BuildMap.prototype.createObjNoCol = function(){
    this.game.objNoCol= this.game.map.createLayer('Objetos no colisionables');
}
BuildMap.prototype.createPlayer = function(){
    this.player = new Personajes.Player(this.game,33*32,11*32);
            this.player.scale.setTo(1.3,1.5);

    this.game.world.addChild(this.player);

};

BuildMap.prototype.createKeys = function(){
    
    var callback = function(){
    };
        

    this.llaves = this.game.add.group();


    callback = function(){
        this.game.estado.cebada = true;
    };

    var cebada = new Llave(this.game,58*32,38*32,'Cebada',callback);

    this.llaves.add(cebada);

    callback = function(){
        this.game.estado.agua = true;
    };

    this.game.agua = new Llave(this.game,78*32,17*32,'Agua',callback);
    this.game.agua.visible = false;

    this.llaves.add(this.game.agua);

    callback = function(){
        this.game.estado.lupulo = true;
    };

    this.game.lupulo = new Llave(this.game,133*32,17*32,'Lupulo',callback);
    this.game.lupulo.visible = false;

    this.llaves.add( this.game.lupulo);

    //CALAVERAS
    callback = function(){
        this.game.numCabeza--;
     };

    var calavera = new Llave(this.game,25*32,23*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,56*32,38*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,74*32,38*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,9*32,38*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,145*32,10*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,146*32,33*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,71*32,54*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,20*32,41*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,107*32,13*32 ,'cabeza',callback);
    this.llaves.add(calavera);

     var calavera = new Llave(this.game,106*32,35*32 ,'cabeza',callback);
    this.llaves.add(calavera);


    callback = function(){
        this.game.estado.raton = true;
    };



    var ratoncillo = new Llave(this.game,143*32,10*32 ,'raton',callback);
    this.llaves.add(ratoncillo);


    callback = function(){
        this.game.estado.llaveAlmacen = true;
    };

   this.llaveAlmacen= new Llave(this.game,11*32,34*32 ,'llave',callback);
    this.llaveAlmacen.scale.setTo(0.2,0.2);
    this.llaves.add(this.llaveAlmacen);
    this.llaveAlmacen.visible = false;



    callback = function(){
        this.game.estado.llaveSalida = true;
    };

    var llaveSalida= new Llave(this.game,14*32,97*32 ,'llave2',callback);
    llaveSalida.scale.setTo(0.2,0.2);
    this.llaves.add(llaveSalida);


  
    


    this.game.world.addChild(this.llaves);


};

BuildMap.prototype.createNPCs = function(){
    var texti = ["Los demonios son una nimiedad comparado "+ '\n' + "con los torturadores, pero se les doma fácilmente. ","¿Quieres saber cómo? Tráeme cebada,"+ '\n' + " agua y lúpulo y haré maravillas.", "adios"];
    var paco = new NPC(this.game,700,300,'monje', texti);
   // var jerry= new Monje(this.game,100,600,'presoArquero', texti);
    this.NPCs = this.game.add.group();

    this.NPCs.add(paco);

    texti = ["¿Qué te trae hasta mí? " + '\n' + "Mis estándares son demasiado altos para ti, NYEHEHEHEHEHEH!!!"];
    var sury = new NPC(this.game,65 * 32, 49 * 32,'sury', texti);
    sury.scale.setTo(0.2,0.2);

    this.NPCs.add(sury);

    texti = ["Uy, no tiene pinta de que quieran moverse." + '\n' + " Parecen bastante hambrientos. " + '\n' + "Me pregunto si puedo encontrar algo para ellos..."];
    var cuervos = new NPC(this.game,57.5* 32, 29 * 32,'cuervos', texti);
    cuervos.scale.setTo(0.2,0.2);

    this.NPCs.add(cuervos);

    texti = ["Hola soy Pablo el palero, y te regalo mi pala como mi gesto más sincero."]
    var pablo = new NPC(this.game,92*32,58*32,'palero',texti);
    this.NPCs.add(pablo);

    texti = ["Vendo lupulo, pero por ser tú, regalo de la cárcel"];
    var romero = new NPC(this.game,133*32,21*32,'Romero',texti);
    this.NPCs.add(romero);

    this.game.world.addChild(this.NPCs);
};

BuildMap.prototype.createGuardias = function (){

    this.guardias = this.game.add.group();

    var guardia1 = new Personajes.Guardia(this.game, 300,300,this.player);

    this.guardias.add(guardia1);

    var guardia2 = new Personajes.Guardia(this.game, 1830,402,this.player);

    this.guardias.add(guardia2);

     var guardia3 = new Personajes.Guardia(this.game, 1816, 655,this.player);
    this.guardias.add(guardia3);

     var guardia4 = new Personajes.Guardia(this.game, 3163, 402,this.player);
    this.guardias.add(guardia4);

     var guardia5 = new Personajes.Guardia(this.game, 3170, 674,this.player);
    this.guardias.add(guardia5);

    var guardia6 = new Personajes.Guardia(this.game, 4103, 508,this.player);
    this.guardias.add(guardia6);

    var guardia7 = new Personajes.Guardia(this.game, 3611, 1129,this.player);
    this.guardias.add(guardia7);

    var guardia8 = new Personajes.Guardia(this.game, 3611, 1636,this.player);
    this.guardias.add(guardia8);

    var guardia9 = new Personajes.Guardia(this.game, 2791, 1662,this.player);
    this.guardias.add(guardia9);

    var guardia10 = new Personajes.Guardia(this.game, 2624, 1095,this.player);
    this.guardias.add(guardia10);

    var guardia11 = new Personajes.Guardia(this.game, 2371, 1095,this.player);
    this.guardias.add(guardia11);

    var guardia12 = new Personajes.Guardia(this.game, 1398, 1122,this.player);
    this.guardias.add(guardia12);

    var guardia13 = new Personajes.Guardia(this.game, 1082, 705,this.player);
    this.guardias.add(guardia13);

    var guardia14 = new Personajes.Guardia(this.game, 1678, 1595,this.player);
    this.guardias.add(guardia14);

    var guardia15 = new Personajes.Guardia(this.game, 1385, 2249,this.player);
    this.guardias.add(guardia15);

    var guardia16 = new Personajes.Guardia(this.game, 951, 2075,this.player);
    this.guardias.add(guardia16);

    var guardia17 = new Personajes.Guardia(this.game, 938, 1709,this.player);
    this.guardias.add(guardia17);

    var guardia18 = new Personajes.Guardia(this.game, 578, 1729,this.player);
    this.guardias.add(guardia18);

    var guardia19 = new Personajes.Guardia(this.game, 625, 2548,this.player);
    this.guardias.add(guardia19);

    var guardia20 = new Personajes.Guardia(this.game, 471, 2868,this.player);
    this.guardias.add(guardia20);

    var guardia21 = new Personajes.Guardia(this.game, 1743, 2958,this.player);
    this.guardias.add(guardia21);

    var guardia22 = new Personajes.Guardia(this.game, 2703, 2958,this.player);
    this.guardias.add(guardia22);

    var guardia23 = new Personajes.Guardia(this.game, 2696, 2558,this.player);
    this.guardias.add(guardia23);

    var guardia24 = new Personajes.Guardia(this.game, 3301, 2198,this.player);
    this.guardias.add(guardia24);

    var guardia25 = new Personajes.Guardia(this.game, 3137, 2198,this.player);
    this.guardias.add(guardia25);

    var guardia26 = new Personajes.Guardia(this.game, 2817, 2198,this.player);
    this.guardias.add(guardia26);

    var guardia27 = new Personajes.Guardia(this.game, 2657, 2198,this.player);
    this.guardias.add(guardia27);

    var guardia28 = new Personajes.Guardia(this.game, 2023, 2520,this.player);
    this.guardias.add(guardia28);

    var guardia29 = new Personajes.Guardia(this.game, 3856, 2443,this.player);
    this.guardias.add(guardia29);

    var guardia30 = new Personajes.Guardia(this.game, 4363, 2443,this.player);
    this.guardias.add(guardia30);

    this._actualizaGuardias = true;
    this.game.world.addChild(this.guardias);
    console.log (this.guardias);
}

BuildMap.prototype.getColisionLayer = function(){
    return this.game.colisiones;
};
BuildMap.prototype.getObjColisionLayer = function(){
    return this.game.objCol;
};
BuildMap.prototype.getAguaLayer = function(){
    return this.game.aguaLayer;
};
BuildMap.prototype.getPuertaPPal = function(){
    return this.game.puertaPrincipalLayer;
};

BuildMap.prototype.getPuertaSalida= function(){
    return this.game.salidaLayer;
};




BuildMap.prototype.update_ = function(){

    this.player.update_();
    
    /*
    this.enemies.forEach(function(enemy) {
        enemy.updateEnemy_();
    });
*/
    if (this._actualizaGuardias === true){
      this.guardias.forEach(function(guardia) {
        guardia.updateGuardia_();
        });
    }
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