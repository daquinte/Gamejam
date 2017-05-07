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
        this.dia = 1;
        this.timePaused = false;
        this.game.numCabeza = 10;

        this.texto = this.game.add.text(this.game.camera.x + 400,this.game.camera.y +100, this.hora + " : " + this.minuto);
        this.textoDia = this.game.add.text(this.game.camera.x + 50 ,this.game.camera.y + 50, "Dia " + this.dia);
        this.textoCabeza = this.game.add.text(this.game.camera.x + 70 ,this.game.camera.y + 580, "x " + this.game.numCabeza);

        this.posIniX = this.mapa.player.x;
        this.posIniY = this.mapa.player.y;



        //Texto cabeza
 
        this.textoCabeza.font = 'Poppins';//Elegimos la fuente
        this.textoCabeza.anchor.set(0.5);//Anclamos el texto

        this.textoCabeza.fill = '#FFA500';
        this.textoCabeza.stroke = '#FF0000';
        this.textoCabeza.strokeThickness = 3;

        this.textoCabeza.fixedToCamera = true;


        //Texto tiempo 
        this.texto.font = 'Poppins';//Elegimos la fuente
        this.texto.anchor.set(0.5);//Anclamos el texto

        this.texto.fill = '#FFA500';
        this.texto.stroke = '#FF0000';
        this.texto.strokeThickness = 3;

        this.texto.fixedToCamera = true;


        //Texto dia
        this.textoDia.font = 'Poppins';//Elegimos la fuente
        this.textoDia.anchor.set(0.5);//Anclamos el texto

        this.textoDia.fill = '#FFA500';
        this.textoDia.stroke = '#FF0000';
        this.textoDia.strokeThickness = 3;

        this.textoDia.fixedToCamera = true;

        this.createButtons();

        this.aumentaTiempo();

        this.game.estado = {};


        //Cebada
        this.dibujoCebada = this.game.add.sprite(this.game.camera.x + 750,this.game.camera.y + 20, 
                                        'Cebada');
        this.dibujoCebada.fixedToCamera = true;
        this.dibujoCebada.visible = false;


        //Agua
        this.dibujoAgua = this.game.add.sprite(this.game.camera.x + 680,this.game.camera.y + 20, 
                                        'Agua');
        this.dibujoAgua.fixedToCamera = true;
        this.dibujoAgua.visible = false;

        //Lupulo
        this.dibujoLupulo = this.game.add.sprite(this.game.camera.x + 715,this.game.camera.y + 60, 
                                        'Lupulo');
        this.dibujoLupulo.fixedToCamera = true;
        this.dibujoLupulo.visible = false;

         //Cabeza
        this.cabeza= this.game.add.sprite(this.game.camera.x + 5,this.game.camera.y + 550, 
                                        'cabeza');
        this.cabeza.fixedToCamera = true;
        this.cabeza.visible = true;


        //Raton
        this.raton= this.game.add.sprite(this.game.camera.x + 750,this.game.camera.y + 100, 
                                        'raton');
        this.raton.fixedToCamera = true;
        this.raton.visible = false;

         //Pala
        this.pala= this.game.add.sprite(this.game.camera.x + 715,this.game.camera.y + 100, 
                                        'pala');
        this.pala.fixedToCamera = true;
        this.pala.visible = false;










         
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
        
            else
                this.texto.text = this.hora + " : " + this.minuto;
        
        if(this.hora >= 22)
            {
                this.mapa.player.movement(0,0);
                this.dia++;
                this.timePaused = true;

        
            }
        if(this.dia===3)
        {
            //GAMEOVER
            //var caca = 0;
            this.game.state.start('gameOver');//Vamos al state de carga
        }
        
    }
        var timer = this.game.time.create(false);

        timer.add(3000, this.aumentaTiempo, this);
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
            if (this.game.physics.arcade.collide(this.mapa.player, this.mapa.getAguaLayer()) && this.game.input.keyboard.isDown(Phaser.Keyboard.E) && this.game.estado.pala)
                 {
                    this.game.agua.visible = true;
                 }


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
            //
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
        this.hora = 20;
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
*/
/*
  checkEnemyDeath: function(enemy){
    if(enemy.isTouchingUp()){
        //this.spiderSound.play();
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
                if(llave.key === 'Cebada')
                    this.dibujoCebada.visible = true;
                    //this.gemSound.play();
                    //this.mapa.currentGems--;
                else if(llave.key === 'Agua')
                    this.dibujoAgua.visible = true;
                else if(llave.key === 'Lupulo')
                    this.dibujoLupulo.visible = true;
                else if(llave.key === 'cabeza')
                    this.textoCabeza.text = "x " + this.game.numCabeza;
                else if(llave.key === 'raton')
                    this.raton.visible = true;

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
                console.log(NPC);
                if(NPC.key === 'monje' && this.game.estado.cebada && this.game.estado.agua && this.game.estado.lupulo)
                {
                        //Parar enemigos para pasar al almacen
                }
                else if(NPC.key === 'palero'){
                    //Mostrar pala por pantalla
                    this.game.estado.pala = true;
                }
                else if(NPC.key === 'guardia' && this.game.estado.Lupulo === true){//Si hablo con el guardia y llevo el lupulo encima
                    this.game.estado.charlaGuardia = true;
                    NPC.mensaje.push("Así que a eso se dedicaba Julián...Gracias, supongo."+  '\n '+ "Por cierto, cuentan que hay un tipo muy extraño" + '\n '+ " en el establo que ha perdido 10 calaveras. Quizá puedas ayudarle.");
                    
                }
                else if(NPC.key === 'sury' && this.game.estado.charlaGuardia){
                     NPC.mensaje.push("Estaba dormido cuando mis primos se habían ido." + '\n' + "Poco sabía yo del lío en el que se habían metido.");
                     NPC.mensaje.push("Rodolfo, Ataúlfo y los demás sus cabezas han perdido." + '\n' + "Si sus diez cabezas encuentras, te ayudaré a salir de este sitio.");
                
                    
                }
                else if(NPC.key === 'sury' && this.game.numCabeza === 0){
                     NPC.mensaje.push("¡Gracias por salvar a mis primos hoy!" + '\n' + "El poder de la invisibilidad yo te doy! NYEHEHEHEHEHEHEH!!");
                     //poder de invisibilidad
                     this.game.estado.pocionObtenida = true;
                }
                else if(NPC.key === 'cuervos' && this.game.estado.raton)
                {
                    NPC.visible = false;
                    this.raton.visible = true;
                    this.game.estado.raton = false;
                    NPC.destroy();
                    return;
                }


                NPC.onCollision();



                //NPC.destroy();
                nextConver = this.game.time.now + 3000;

            }

            if (this.hora >= 21){
                this.mapa.guardia.forEach(function(guardia){
                   this.mapa.guardia._zonaHoraria === true;     
                });
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
    */

    //Configura la escena al inicio
    configure: function()
    {
        //Color de fondo
        this.game.stage.backgroundColor = '#a9f0ff';

        //Start the Arcade Physics systems
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
};

module.exports = PlayScene;
