'use strict';

//var Pausa = require('./Pausa.js');
var Mapa = require('./Mapa.js');

var nextConver = 0

//Scena de juego.
var PlayScene = 
{
    //Método constructor...
    create: function () 
    {
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR]);
        this.mapa = new Mapa(this.game);
     
        this.configure();
        this.hora = 9;
        this.minuto = 0;
        this.dia = 0;
        this.timePaused = false;

        this.texto = this.game.add.text(this.game.camera.x + 400,this.game.camera.y +100, this.hora + " : " + this.minuto);

        this.posIniX = this.mapa.player.x;
        this.posIniY = this.mapa.player.y;

         this.texto.font = 'Poppins';//Elegimos la fuente
        this.texto.anchor.set(0.5);//Anclamos el texto

        this.texto.fill = '#FFA500';
        this.texto.stroke = '#FF0000';
        this.texto.strokeThickness = 3;

        this.texto.fixedToCamera = true;

        this.createButtons();

        this.aumentaTiempo();

        this.game.estado = {};

        //Creamos la pausa
       // this.pausa = new Pausa(this.game,this.mapa.player.getAnimations(),this.mapa.enemies , this.mapa.musica);

        //Sonidos
        /*
        this.spiderSound = this.game.add.audio('spiderSound');
        this.gemSound = this.game.add.audio('gemSound');
        this.rocketSound = this.game.add.audio('rocketSound');
        */
    },

    createButtons: function (){
        //Añadimos el botón
        this.buttonCelda = this.game.add.button(0, 
                                               0, 
                                               'button', 
                                               this.CeldaOnClick, 
                                               this, 2, 0, 0);
        this.buttonCelda.anchor.set(0.5);//Anclamos el botón

        var textCelda = this.game.add.text(0, 0, "Volver a la celda");//Creamos el texto
        textCelda.font = 'Poppins';//Elegimos la fuente
        textCelda.anchor.set(0.5);//Anclamos el texto
        //textCelda.fill = '#43d637';//PODEMOS PODER COLOR ASÍ

        textCelda.fill = '#FFA500';
        textCelda.stroke = '#FF0000';
        textCelda.strokeThickness = 3;
        textCelda.fontSize = 16;


        this.buttonCelda.addChild(textCelda);//Metemos el texto en el botón

        this.buttonCelda.visible = false;


    },

    aumentaTiempo: function ()
    {
          if(!this.timePaused){
        this.minuto+=10;
      
        if(this.minuto === 60){
            this.minuto = 0;
            this.hora++;
            this.texto.text = this.hora + " : " + "00";

        }
        else{
        this.texto.text = this.hora + " : " + this.minuto;
    }
        if(this.hora === 22)
        {
            this.mapa.player.movement(0,0);
            this.timePaused = true;

        }
        }
        var timer = this.game.time.create(false);

        timer.add(1000, this.aumentaTiempo, this);
        timer.start();
    },
    
    //IS called one per frame.
    update: function () 
    {

        if (!this.timePaused)
        {

            //UPDATE DE TODAS LAS ENTIDADES
            //COLISION JUGADOR - TILES
            this.game.physics.arcade.collide(this.mapa.player, this.mapa.getColisionLayer());
            this.game.physics.arcade.collide(this.mapa.player, this.mapa.getObjColisionLayer());

            //COLISION ENEMIGOS - TRIGGERS
            /*
            this.mapa.enemies.forEach(function(enemy) 
            {
                this.game.physics.arcade.collide(enemy, this.mapa.getTriggerLayer());
            }.bind(this));
*/

            this.mapa.update_();


            //COLISION JUGADOR - MUERTE (ENEMIGOS Y CAPA MUERTE)
            //this.checkPlayerDeath();

            //COLISION JUGADOR - COHETE
            //COLISION JUGADOR - GEMAS

            //this.checkFinalLevel();
            this.checkCollisionWithKey();
            this.checkCollisionWithNPCs();


            //Detectar input de pausa
            //this.pausa.inputPause();
        }
        else
        {
            this.ChooseNight();
        }
        /*
        else if (this.pausa.goToMenu())
        {
            this.game.cache.destroy();
            this.destroy();
            this.game.state.start('boot');

        }
        */
    },

    ChooseNight: function()
    {
       this.buttonCelda.visible = true;
       this.buttonCelda.x = this.mapa.player.x - 100;
       this.buttonCelda.y = this.mapa.player.y - 100;
    },

     //Al pulsar el botón
    CeldaOnClick: function(){
        this.mapa.player.x = this.posIniX;
        this.mapa.player.y = this.posIniY;
        this.mapa.player.body.position = new Phaser.Point(this.posIniX, this.posIniY);
        //this.mapa.player.body.position.y = ;
        this.hora = 9;
        this.texto.text = "Hora: " + this.hora;
        this.buttonCelda.visible = false;

        this.dia++;
        this.timePaused = false;
        //mover al jugador y reiniciar hora
    } ,

   /*//Comprueba si el jugador ha muerto por colision con la capa muerte o con el enemigo
    checkPlayerDeath: function()
    {
        var enemyDeath = false;
        var playerDeath = false;
        this.mapa.enemies.forEach(function(enemy) 
        {
            if(this.game.physics.arcade.collide(enemy, this.mapa.player))
            {
                if (this.checkEnemyDeath(enemy))
                    enemyDeath = true;
                
                else
                    playerDeath = true;

            }
            
        }.bind(this));

        if(playerDeath  || this.game.physics.arcade.collide(this.mapa.player, this.mapa.getDeathLayer()))
        {
            this.game.state.start('gameOver');
            this.destroy();
        }
    },

  checkEnemyDeath: function(enemy){
    if(enemy.isTouchingUp()){
        this.spiderSound.play();
        enemy.destroy();
        return true;
    }
    return false;
  },
  */

    checkCollisionWithKey: function()
    {
        this.mapa.llaves.forEach(function(llave) 
        {
            if (this.game.physics.arcade.collide(llave, this.mapa.player))
            {
                llave.onCollision();
                //this.gemSound.play();
                //this.mapa.currentGems--;
                llave.destroy();
            }
        }.bind(this));
            
    },

    checkCollisionWithNPCs: function()
    {
        this.mapa.NPCs.forEach(function(NPC) 
        {
            if (this.game.physics.arcade.collide(NPC, this.mapa.player) 
                && this.game.input.keyboard.isDown(Phaser.Keyboard.E) &&
                this.game.time.now > nextConver)
            {
                console.log(this.game.estado.alimento1 && this.game.estado.alimento2 && this.game.estado.alimento3);
                NPC.onCollision();
                //this.gemSound.play();
                //this.mapa.currentGems--;
                //NPC.destroy();
                nextConver = this.game.time.now + 3000;

            }
        }.bind(this));
            
    },

    /*

    checkFinalLevel: function()
    {
         if(this.game.physics.arcade.collide(this.mapa.player, this.mapa.rocket) 
            && this.mapa.currentGems === 0)
         {
            this.mapa.currentGems = -1;
            this.rocketSound.play();

            var timer = this.game.time.create(false);
            this.mapa.player.visible = false;

            this.mapa.rocket.animations.play('takingOff');   
            this.mapa.rocket.body.position.y += 50;

            this.mapa.rocket.body.velocity.y = -100;

        //  Set a TimerEvent to occur after 3 seconds
            timer.add(3000, this.goToNextNevel, this);
            timer.start();
        }
            
    },

    goToNextNevel: function()
    {
        this.game.currentLevel++;
        this.destroy();
        this.game.state.start('preloader');
        
    },*/

    //Configura la escena al inicio
    configure: function()
    {
        //Color de fondo
        this.game.stage.backgroundColor = '#a9f0ff';

        //Start the Arcade Physics systems
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    //Destruimos los recursos tilemap, tiles y logo.
    destroy: function()
    {
       // this.spiderSound.destroy();
       // this.gemSound.destroy();
        //this.rocketSound.destroy();
        //this.mapa.destroy();//Destruye todo lo referente al mapa

        this.game.world.setBounds(0,0,800,600);
    }

};

module.exports = PlayScene;
