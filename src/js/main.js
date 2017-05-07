'use strict';

//Require de las escenas
var PlayScene = require('./play_scene.js');
//var PlayScene2 = require('./play_scene2.js');
var GameOverScene = require('./gameover_scene.js');
var MenuScene = require('./menu_scene.js');
var FinalScene = require('./final_scene.js');


//Carga imágenes del menu y llama al state menu
var BootScene = {
  preload: function () {
    //Carga 
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');//Barra de carga
    this.game.load.image('backPreloader_bar', 'images/fondoBarraCarga.png');//Barra de carga
    this.game.load.spritesheet('button', 'images/boton.png', 300,83,3);//Imagen del botón
    //this.game.load.spritesheet('buttonExit', 'images/boton_naranja.png', 190,45.5,3);//Imagen del botón
    this.game.load.image('logo', 'images/fondoMenu.png');//Imagen del logo
    this.game.load.audio('musicaMenu','sound/musicaMenu.mp3');
    //this.game.load.audio('buttonSound','sound/buttonSound.wav');

  },

  create: function () {
      this.game.state.start('menu');//Se carga la escena Menú
  }
};


var PreloaderScene = {
  
  preload: function () {
    //Barra de carga
    var fondoBarraCarga = this.game.add.sprite(80,300,'backPreloader_bar');
    fondoBarraCarga.anchor.setTo(0,0.5);
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');//Añadimos la barra de carga
    this.loadingBar.anchor.setTo(0, 0.5);//Anclamos la barra
    this.game.load.setPreloadSprite(this.loadingBar);//Añadimos el sprite de precarga

    //Color de fondo en la escena de carga
    this.game.stage.backgroundColor = "#000000";

    //Nos suscribimos al evento de cuando se inicia la carga
    this.load.onLoadStart.add(this.loadStart, this);

      this.game.cache.removeImage('logo');

      this.game.load.image('gameOver', 'images/gameOver.png');//Imagen del logo

      //MAPA
      this.game.load.tilemap('tilemap1', 'maps/mapa.json',null,Phaser.Tilemap.TILED_JSON);//Cargar el tilemap(hecho)
      
      //PERSONAJES
      this.game.load.spritesheet('player','images/Animacion.png',19,26);
      //this.game.load.spritesheet('enemy','images/enemy.png',77,53);

      //this.game.load.spritesheet('player','images/foxSpriteSheet.png',56,80);
      this.game.load.image('enemy','images/enemy.png');

      this.game.load.image('guardia','images/guardia.png');

      this.game.load.image('conoLuz','images/luz.png');

      //TILES
      this.game.load.image('tiles', 'images/tileset.png');//cargar sprites del tilemap


      //OBJETOS
      this.game.load.image('gemaAzul','images/gemBlue.png');
      this.game.load.image('monje','images/monje.png');
      this.game.load.image('Agua','images/Agua.png');
      this.game.load.image('Cebada','images/Cebada.png');
      this.game.load.image('Lupulo','images/Lupulo.png');
      this.game.load.image('cabeza','images/cabeza.png');  
      this.game.load.image('llave','images/key.png');
      this.game.load.image('palero','images/pavoRandom.png');
      this.game.load.image('sury','images/sury.png');
      this.game.load.image('raton','images/ratoncillo.png');
      this.game.load.image('cuervos','images/cuervos.png');
      this.game.load.image('guardia','images/ratoncillo.png');
      this.game.load.image('Romero','images/presoArquero.png');
      this.game.load.image('pala','images/pala.png');
      this.game.load.image('llave','images/key.png');
      this.game.load.image('llave2','images/key.png');
  

      //SONIDO
      this.game.load.audio('musicaJuego','sound/musicaJuego1.wav');


    this.game.load.image('fondoFinal', 'images/gameOver.png');//Imagen del logo

    this.load.onLoadComplete.add(this.loadComplete, this);//Nos suscribimos al evento de cuando finaliza la carga
  },

  //Evento cuando inicia carga
  loadStart: function () {
    console.log("Game Assets Loading ...");
  },
    
  //Evento cuando termina la carga
  loadComplete: function ()
  {
    this.game.state.start('play');
    //else   
     //this.game.state.start('final');
  },

  //Esto debería avanzar la barra de carga
  update: function(){
      this._loadingBar
  }
};

//Cuando termina la carga de la ventana
window.onload = function () {
  WebFont.load(wfconfig);//Cargamos la fuente de la web
};

//Configuración de la fuente
var wfconfig = {
    //Se llama al principio
    active: function() { 
        console.log("font loaded");
        init();//llamamos a iniciar el juego
    },
    
    //Tipo de fuente
    google: {
        families: ['Poppins','Indie Flower']//boton, titulo / game over
    }
 
};

//Inicia el juego
function init()
{
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');//Creación del juego

//Asignación de los states
  game.state.add('boot', BootScene);
  game.state.add('menu', MenuScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  //game.state.add('play2', PlayScene2);
  game.state.add('gameOver', GameOverScene);
  game.state.add('final', FinalScene);


//iniciamos el state 'boot'
  game.state.start('boot');//Inicia el menú
};



