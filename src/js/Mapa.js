'use strict';

var Objetos = require('./Objects.js');
var Personajes = require('./Entidades.js');

var ObjectPhysical = Objetos.ObjectPhysical;

//var Rocket = Objetos.Rocket;
//var Gem = Objetos.Gem;
//var Flag = Objetos.Flag;


var Entity= Personajes.Entity;
var Player= Personajes.Player;
var Enemy= Personajes.Enemy;
var Guardia= Personajes.Guardia;

function BuildMap(game)
{
	this.game = game;

        //Cargamos el tilemap en el map
        this.game.map =  game.add.tilemap('tilemap1');

    	//Asignamos al tileset 'patrones' la imagen de sprites tiles
        //patrones es lo de tiled y tiles, el nombre que tu le das en el main
        this.game.map.addTilesetImage('tileset','tiles');

    	//Creacion de las layers
        this.game.suelo = game.map.createLayer('Suelo');
    	this.game.colisiones = game.map.createLayer('Colisiones');

    	//Colisiones con el plano de muerte y con el plano de muerte y con suelo.
    	this.game.map.setCollisionBetween(1, 500, true, 'Colisiones');


        //Limites de colisiones
        this.game.world.setBounds(0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);//Límite del mundo

        this.player = new Personajes.Player(this.game,300,300);
        this.game.world.addChild(this.player);

        var enemy = new Personajes.Enemy(this.game,210,750, this.player);

        var guardia = new Personajes.Guardia(this.game, 400,400, this.player);



        this.enemies = this.game.add.group();
        this.enemies.add(enemy);
   

        this.game.world.addChild(this.enemies);

        //----
        this.guardias = this.game.add.group();
        this.guardias.add(guardia);

        this.game.world.addChild(this.guardias);

        //var gemBlue = new Gem(this.game,900,190,'gemaAzul');

        
        //this.gems = this.game.add.group();

        //this.gems.add(gemBlue);

        //this.game.world.addChild(this.gems);

       // this.musica = this.game.add.audio('musica1');
       // this.musica.loop = true;
       // this.musica.play();



    //game.groundLayer.resizeWorld(); //resize world and adjust to the screen

};

BuildMap.prototype.getColisionLayer = function(){
        return this.game.colisiones;

};



BuildMap.prototype.update_ = function(){

    this.player.update_();
    
    this.enemies.forEach(function(enemy) {
        enemy.updateEnemy_();
    });

      this.guardias.forEach(function(guardia) {
        guardia.updateGuardia_();
    });
}

BuildMap.prototype.destroy = function()
{
    //ENTIDADES
    this.player.destroy();
    //this.enemies.destroy();

    //LAYERS

    this.game.fondo.destroy();

   // this.musica.destroy();

    //MAPA
    this.game.map.destroy();
};

module.exports = BuildMap;