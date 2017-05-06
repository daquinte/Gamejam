'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'RUN':0,'STOP':1, 'HIDE':2};
var Direction = {'LEFT':0, 'RIGHT':1, 'UP':2, 'DOWN':3, 'NONE':4}

//var nextJump = 0;//Contador para el próximo salto


 ////////////ENTITY////////////////////////
function Entity(game,speed,direction,posX,posY,name){
    this.game=game;
    this._speed = speed;
    this._direction = direction;
    Phaser.Sprite.call(this,game,posX,posY,name);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

}

Entity.prototype = Object.create(Phaser.Sprite.prototype);//Ajustamos el prototipo
Entity.constructor = Entity;

/*Entity.prototype.changeDirectionLeft= function()
{
    if(this.scale.x > 0)
        this.scale.x *= -1; 
    
};

Entity.prototype.changeDirectionRight= function()
{
    if(this.scale.x < 0)
        this.scale.x *= -1; 

};
*/
Entity.prototype.getEntity = function(){
    return this;
};

Entity.prototype.movement= function(x, y)
{
    this.body.velocity.x =x;
    this.body.velocity.y =y;
};

Entity.prototype.isTouching= function()
{
    return (this.body.touching.right || this.body.blocked.right || this.body.touching.left || this.body.blocked.left || this.body.blocked.up || this.body.touching.up || this.body.blocked.down || this.body.touching.down   );
}

/*Entity.prototype.getAnimations = function(){
    return this.animations;
};*/
 ////////////ENTITY////////////////////////


///////////////PLAYER///////////////////////

function Player(game,posX,posY)
{
    Entity.call(this,game,400,Direction.NONE,posX,posY,'player');
    this._playerState= PlayerState.STOP; //estado del player

/*
	//nombre de la animación, frames, framerate, isloop
    this.animations.add('run',[3,4,5],10,true);
    this.animations.add('stop',[0,1,2],7,true);
    this.animations.add('jump',[6,7],5,false);
    this.animations.add('fall',[8],5,false);
    this.animations.add('unhand',[21,22,23],10,false);
    this.animations.add('grab',[19,20],30,false);//Animación de agarre
*/
    //this.jumpSound = this.game.add.audio('jumpSound');
    //this.jumpSound.volume = 0.5;

    //Gravedad del juego
    //this.body.bounce.y = 0.2;

    //Velocidad del jugador
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    this.game.camera.follow(this,Phaser.Camera.FOLLOW_LOCKON);//La cámara te sigue

};

Player.prototype = Object.create(Entity.prototype);//Ajustamos el prototipo
Player.constructor = Player;


Player.prototype.update_ = function()
{
	var moveDirection = new Phaser.Point(0, 0);
    var movement = this.GetMovement();
  

    //transitions
    switch(this._playerState)
    {
        case PlayerState.STOP:
        case PlayerState.RUN:
            /*if(this.isJumping() && this.game.time.now > nextJump)
            {
                nextJump = this.game.time.now + 1000;
            }*/
            
            if(movement !== Direction.NONE)
            {
                this._playerState = PlayerState.RUN;
                //this.animations.play('run');
            }
            else
            {
                this._playerState = PlayerState.STOP;
                //this.animations.play('stop');
            }
              
            break;
                

    }
    //States
    switch(this._playerState)
    {       
        case PlayerState.STOP:
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            break;

        case PlayerState.RUN:
            if(movement === Direction.RIGHT)
            {
                moveDirection.x = this._speed;
                //this.changeDirectionRight();
            }
            else if (movement === Direction.LEFT)
            {
                moveDirection.x = -this._speed;
                //this.changeDirectionLeft();
            }
            else if (movement === Direction.UP)
            {
                moveDirection.y = -this._speed;
                //this.changeDirectionLeft();
            }
            else if (movement === Direction.DOWN)
            {
                moveDirection.y = this._speed;
               // this.changeDirectionLeft();
            }

           
            //this.SetPosAct(moveDirection.x, moveDirection.y);    //Actualizamos la posicion del jugador para que la sepa el guardia
            this.movement(moveDirection.x, moveDirection.y);

           

            break;    
    }


};



//Obtiene el Input del jugador
Player.prototype.GetMovement= function()
{
    var movement = Direction.NONE
    //Move Right
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        movement = Direction.RIGHT;
        
    //Move Left
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        movement = Direction.LEFT;

       //Move Up
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        movement = Direction.UP;

       //Move Down
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        movement = Direction.DOWN;


        
    return movement;



};

Player.prototype.getPosX = function (){
    return this.body.x;
};


Player.prototype.getPosY = function (){
   return this.body.y;
};

///////////////PLAYER///////////////////////

/////////////////ENEMY////////////////////


function Enemy(game,posX,posY,player){

    Entity.call(this,game,200,Direction.LEFT,posX, posY,'enemy'); 
   // this.animations.add('walk',[1,2],10,true);
    //this.animations.add('dead',[3],1,false);
    //this.animations.play('walk');
    this.player = player;

};

Enemy.prototype = Object.create(Entity.prototype);//Ajustamos el prototipo
Enemy.constructor = Enemy;

Enemy.prototype.updateEnemy_ = function()
{
    var moveDirection = new Phaser.Point(this.player.getPosX(), this.player.getPosY());
    //new Phaser.Point(this.player.GetPosAct().x,this.player.GetPosAct().y); 
    //this.player.GetActPos();

    //console.log(moveDirection);

    //this.changeDirectionEnemy();
    //this.movement(moveDirection);
    if (this.body.x != moveDirection.x && this.body.y != moveDirection.y ) {
        this.game.physics.arcade.moveToXY(this,moveDirection.x,moveDirection.y,60,0);
    };
};

Enemy.prototype.changeDirectionEnemy = function(){//Cambia la dirección al chocar una pared
    if(this.isTouchingRight())
        this._direction = Direction.LEFT;


    else if(this.isTouchingLeft())
        this._direction = Direction.RIGHT;

};

Enemy.prototype.isTouchingUp = function()
{
    if (this.scale.y > 0)
        return (this.body.touching.up || this.body.blocked.up);
    else
        return (this.body.touching.down || this.body.blocked.down);

};

/////////////////ENEMY////////////////////
/////////////////POLY GUARDIA////////////////////
//var poly;

//var graphics;
       

/////////////////POLY GUARDIA////////////////////
/////////////////GUARDIA////////////////////
function Guardia(game,posCreacionX,posCreacionY,player){

    Entity.call(this,game,200,Direction.UP,posCreacionX, posCreacionY,'guardia'); 
   // this.animations.add('walk',[1,2],10,true);
    //this.animations.add('dead',[3],1,false);
    //this.animations.play('walk');
    this.player = player;

    
};

Guardia.prototype = Object.create(Entity.prototype);//Ajustamos el prototipo
Guardia.constructor = Guardia;

Guardia.prototype.updateEnemy_ = function()        //Se llama igual para evitar movidas? 
{

    this.poly = new Phaser.Polygon([ new Phaser.Point (this.body.x,this.body.y), new Phaser.Point (this.body.x*Math.cos(60), this.body.y *Math.sin(60)), 
        new Phaser.Point (this.body.x*Math.cos(-60),this.body.y*Math.sin(-60))]);


    this.graphics = this.game.add.graphics(this.body.x, this.body.y);

    this.graphics.beginFill(0xFF33ff);
    this.graphics.drawPolygon(this.poly.points);
    this.graphics.endFill();

    this.addChild(this.graphics);

   /* var rnd = Math.floor((Math.random() * 4) + 1); 

    switch (rnd){

        case 0:
          this._direction = Direction.RIGHT;
        break;

            case 1:
          this._direction = Direction.LEFT;
        break;

            case 2:
          this._direction = Direction.UP;
        break;

            case 3:
          this._direction = Direction.DOWN;
        break;
    }
    */
            this.graphics.clear();

            if (this.poly.contains(this.player.getPosX(), this.player.getPosY())){

                    console.log(this.player.getPosX(), this.player.getPosY());
                  this.graphics.beginFill(0xFF3300);
                console.log ("Hola estás dentro de mi, me estás oprimiendo");
            }

            else{
                this.graphics.beginFill(0xFF33ff);
             console.log ("Cuack");
         }

            this.graphics.drawPolygon(this.poly.points);
            this.graphics.endFill();

  var moveDirection = new Phaser.Point(0, 0);

    if(this._direction === Direction.RIGHT){
        moveDirection.x = this._speed;
        //this.changeDirectionLeft();
    }
    else if (this._direction === Direction.LEFT){
        moveDirection.x = -this._speed;
        //this.changeDirectionRight();
    }

    else if (this._direction === Direction.UP){
        moveDirection.y = -this._speed;
        //this.changeDirectionUp();
    }
    else if (this._direction === Direction.DOWN){
        moveDirection.y = this._speed;
        //this.changeDirectionDown();
    }
    //this.changeDirectionGuardia();
    //this.movement(moveDirection.x, moveDirection.y);


   // console.log("bing bing BONG");

};

Guardia.prototype.changeDirectionGuardia = function(){//Cambia la dirección al chocar una pared
    if(this.isTouchingRight())
        this._direction = Direction.LEFT;


    else if(this.isTouchingLeft())
        this._direction = Direction.RIGHT;

};

Guardia.prototype.isTouchingUp = function()
{
    if (this.scale.y > 0)
        return (this.body.touching.up || this.body.blocked.up);
    else
        return (this.body.touching.down || this.body.blocked.down);

};

module.exports = {Player: Player, Enemy: Enemy, Guardia: Guardia, Entity: Entity};
