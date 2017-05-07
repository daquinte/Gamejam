//State
var MenuScene = {
  //Al inicio del state
    create: function () {
        /*
        this.music = this.game.add.audio('musicaMenu');
        this.sound = this.game.add.audio('buttonSound');

        this.music.play();
        this.music.loop = true;
        */

        //Añadimos sprite de logo
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);//Anclamos el logo

        //Añadimos el botón
        var buttonJugar = this.game.add.button(this.game.world.centerX + 130, 
                                               this.game.world.centerY - 60, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 0, 0);
        buttonJugar.anchor.set(0.5);//Anclamos el botón

        //buttonJugar.scale.x*= 1.5;
        //buttonJugar.scale.y*= 1.5;

        var textJugar = this.game.add.text(0, 0, "Jugar");//Creamos el texto
        textJugar.font = 'Poppins';//Elegimos la fuente
        textJugar.anchor.set(0.5);//Anclamos el texto
        //textJugar.fill = '#43d637';//PODEMOS PONER COLOR ASÍ

        textJugar.fill = '#FFA500';
        textJugar.stroke = '#FF0000';
        textJugar.strokeThickness = 3;

        buttonJugar.addChild(textJugar);//Metemos el texto en el botón

        this.buttonControl = this.game.add.button(this.game.world.centerX  + 130, 
                                               this.game.world.centerY + 100, 
                                               'button', 
                                               this.controlOnClick, 
                                               this, 2, 0, 0);
        this.buttonControl.anchor.set(0.5);//Anclamos el botón

        var textControl = this.game.add.text(0, 0, "Controles");//Creamos el texto
        textControl.font = 'Poppins';//Elegimos la fuente
        textControl.anchor.set(0.5);//Anclamos el texto
        //textStart.fill = '#43d637';//PODEMOS PODER COLOR ASÍ

        textControl.fill = '#FFA500';


        this.textTutorial = this.game.add.text(30,420,"Controles teclado:"+'\n'+"-Puedes moverte con las flechas de dirección" + '\n' +
            "-Puedes interactuar con la tecla E"+ '\n' + "Controles mando:" + '\n' + "-Puedes moverte con los cursores de dirección"
             + '\n' + "-Puedes interactuar con el botón A");

        this.buttonControl.addChild(textControl);//Metemos el texto en el botón

      
        this.textTutorial.fill = '#FFA500';

        this.textTutorial.fontSize = 20;

        this.textTutorial.visible = false;
    },
    
    //Al pulsar el botón
    actionOnClick: function(){
       // this.sound.play();
        //this.music.destroy();
        this.game.state.start('preloader');//Vamos al state de carga
    } ,

    controlOnClick: function(){
       // this.sound.play();
        this.textTutorial.visible = true;
        this.buttonControl.visible = false;
    } 
};

module.exports = MenuScene;