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


    
    this.createTilemap();
    this.createPlayer();
    this.createObjNoCol();
    



    var guardia = new Personajes.Guardia(this.game, 400,400, this.player);

   



    this.createKeys();

    this.createNPCs();


     
    this.guardias = this.game.add.group();
    this.guardias.add(guardia);

    this.game.world.addChild(this.guardias);



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

    var llaveAlmacen= new Llave(this.game,11*32,34*32 ,'llave',callback);
    llaveAlmacen.scale.setTo(0.2,0.2);
    this.llaves.add(llaveAlmacen);



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

      this.guardias.forEach(function(guardia) {
        guardia.updateGuardia_();
    });
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