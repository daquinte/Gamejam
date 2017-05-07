var GameOver = {
    create: function () {
        console.log("Game Over");
        
        //this.sound = this.game.add.audio('buttonSound');

        //this.music = this.game.add.audio('musicaMenu');
        //this.music.play();
        //this.music.loop = true;
        //Añadimos sprite de fondo

        var fondo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'gameOver');
        fondo.anchor.setTo(0.5, 0.5);//Anclamos el fondo

        /*var pj = this.game.add.sprite(370,400,'fox');
        pj.animations.add('exhausted',[24,25,26],10,true);
        pj.animations.play('exhausted');*/
        
        //Botón vuelta al menu
        var button2 = this.game.add.button(500, 200, 
                                          'button', 
                                          this.returnMainMenu, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);

        //Texto dentro del botón
        var text2 = this.game.add.text(0, 0, "Menú");
        text2.font = 'Poppins';//Elegimos la fuente

        text2.anchor.set(0.5);
        button2.addChild(text2);

          //Texto en el menú
        /*var goText = this.game.add.text(400, 150, "GameOver");
        goText.font = 'Indie Flower';//Elegimos la fuente
        goText.fontSize = 100;
        goText.fill = '#FFA500';


        goText.anchor.set(0.5);*/
    },
    
    actionOnClick: function()
    {
        this.sound.play();
        this.music.destroy();
            this.game.state.start('preloder');

        /*else if (this.game.currentLevel === 2)
            this.game.state.start('play2');*/

    },

    returnMainMenu: function()
    {
        //this.sound.play();
        //this.music.destroy();

        //IMAGENES DEL PRELOADER
        this.game.cache.removeImage('preloader_bar');
        this.game.cache.removeImage('backPreloader_bar');
        this.game.cache.removeImage('fondoFinal');
        //this.game.cache.removeSound('musicaMenu');//Recurso
        
        this.game.state.start('boot');
    }

};

module.exports = GameOver;
