'use strict';

function PhysicalObject(game,posX,posY,nombreImagen)
{
    this.game = game;
    Phaser.Sprite.call(this,game,posX,posY,nombreImagen);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.game.physics.arcade.enable(this);
}

PhysicalObject.prototype = Object.create(Phaser.Sprite.prototype);//Ajustamos el prototipo
PhysicalObject.constructor = PhysicalObject;

/*
///////////////ROCKET///////////////////////
function Rocket(game,posX,posY)
{
    PhysicalObject.call(this,game,posX,posY,'Rocket');
    this.body.immovable = true;
    this.animations.add('idle',[0],1,false);
    this.animations.add('takingOff',[1],1,false);
    this.animations.play('idle');
}

Rocket.prototype = Object.create(PhysicalObject.prototype);//Ajustamos el prototipo
Rocket.constructor = Rocket;
///////////////ROCKET///////////////////////
*/



///////////////COLLECTABLE///////////////////////
function Llave(game,posX,posY,sprite,collision)
{
    PhysicalObject.call(this,game,posX,posY,sprite);
    this.collision = collision;
}

Llave.prototype = Object.create(PhysicalObject.prototype);//Ajustamos el prototipo
Llave.constructor = Llave;

Llave.prototype.onCollision = function(){
    this.collision();
};


function NPC(game,posX,posY,sprite,mensaje)
{
    PhysicalObject.call(this,game,posX,posY,sprite);
    this.posX = posX;
    this.posY = posY;
    this.mensaje = mensaje;
    this.mesIndex = 0;
        this.body.immovable = true;
}

NPC.prototype = Object.create(PhysicalObject.prototype);//Ajustamos el prototipo
NPC.constructor = NPC;

NPC.prototype.onCollision = function(){

    //this.bocadilloDialogo = this.game.add.sprite(this.posX + 100,this.posY +100,'bocadillo');
     this.texto = this.game.add.text(this.posX + 100,this.posY +100,this.mensaje[this.mesIndex]);


        this.texto.fill = '#FFA500';

        this.texto.fontSize = 20;

        this.mesIndex++;

        if (this.mesIndex === this.mensaje.length)
            this.mesIndex = 0;

            var timer = this.game.time.create(false);

            timer.add(2000, this.destroyText, this);
            timer.start();
        //this.textTutorial.visible = false;
      //this.mensaje[mesIndex].
};

NPC.prototype.destroyText = function()
{
    this.texto.visible = false;
};



///////////////COLLECTABLE///////////////////////


/*
function Flag(game,posX,posY)
{
    PhysicalObject.call(this,game,posX,posY,'flag');
}

Flag.prototype = Object.create(PhysicalObject.prototype);//Ajustamos el prototipo
Flag.constructor = Flag;
*/

module.exports = {PhysicalObject: PhysicalObject, Llave: Llave, NPC: NPC/*, Rocket: Rocket, Gem: Gem,Flag: Flag*/};
