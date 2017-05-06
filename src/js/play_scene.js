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
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN]);
        this.mapa = new Mapa(this.game);
     
        this.configure();
        this.tiempo = 20;
        this.dia = 0;
        this.timePaused = false;

        this.texto = this.game.add.text(this.game.camera.x + 400,this.game.camera.y +100,"Hora: " + this.tiempo);

        console.log(this.mapa.player.posX);
        this.posIniX = this.mapa.player.posX;
        this.posIniY = this.mapa.player.posY;

         this.texto.font = 'Poppins';//Elegimos la fuente
        this.texto.anchor.set(0.5);//Anclamos el texto

        this.texto.fill = '#FFA500';
        this.texto.stroke = '#FF0000';
        this.texto.strokeThickness = 3;

        this.texto.fixedToCamera = true;

        this.aumentaHora();

        //Creamos la pausa
       // this.pausa = new Pausa(this.game,this.mapa.player.getAnimations(),this.mapa.enemies , this.mapa.musica);

        //Sonidos
        /*
        this.spiderSound = this.game.add.audio('spiderSound');
        this.gemSound = this.game.add.audio('gemSound');
        this.rocketSound = this.game.add.audio('rocketSound');
        */
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    },

    aumentaHora: function ()
    {
        this.tiempo++;
        this.texto.text = "Hora: " + this.tiempo;

        if(this.tiempo == 22)
        {
            this.mapa.player.movement(0,0);
            this.timePaused = true;

        }
        
        var timer = this.game.time.create(false);

        timer.add(10000, this.aumentaHora, this);
        timer.start();
        
    },
    
    //IS called one per frame.
    update: function () 
    {
        if (!this.timePaused)
        {
            console.log("hola");

            //UPDATE DE TODAS LAS ENTIDADES
            //COLISION JUGADOR - TILES
            this.game.physics.arcade.collide(this.mapa.player, this.mapa.getColisionLayer());

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
             //Añadimos el botón
            this.buttonCelda = this.game.add.button(this.game.world.centerX  -50, 
                                               this.game.world.centerY, 
                                               'button', 
                                               this.CeldaOnClick, 
                                               this, 2, 0, 0);
            this.buttonCelda.anchor.set(0.5);//Anclamos el botón

            this.buttonCelda.scale.x*= 1.5;
            this.buttonCelda.scale.y*= 1.5;

            var textCelda = this.game.add.text(0, 0, "Volver a la celda");//Creamos el texto
            textCelda.font = 'Poppins';//Elegimos la fuente
            textCelda.anchor.set(0.5);//Anclamos el texto
            //textCelda.fill = '#43d637';//PODEMOS PODER COLOR ASÍ

            textCelda.fill = '#FFA500';
            textCelda.stroke = '#FF0000';
            textCelda.strokeThickness = 3;

            this.buttonCelda.addChild(textCelda);//Metemos el texto en el botón
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

     //Al pulsar el botón
    CeldaOnClick: function(){
        this.mapa.player.x = this.posIniX;
        this.mapa.player.y = this.posIniY;
        this.mapa.player.body.position = new Phaser.Point(this.posIniX, this.posIniY);
        //this.mapa.player.body.position.y = ;
        this.tiempo = 9;
        this.texto.text = "Hora: " + this.tiempo;
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
