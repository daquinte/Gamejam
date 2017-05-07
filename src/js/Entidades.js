'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'RUN':0,'STOP':1, 'HIDE':2};
var Direction = {'LEFT':0, 'RIGHT':1, 'UP':2, 'DOWN':3, 'NONE':4}
var estadosGuardia = {'SOSEGADO': 0, 'ALERTA' :1}

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
};

/*Entity.prototype.getAnimations = function(){
    return this.animations;
};*/
 ////////////ENTITY////////////////////////

///////////////URSS///////////////////////


///////////////PLAYER///////////////////////

function Player(game,posX,posY)
{
    Entity.call(this,game,400,Direction.NONE,posX,posY,'player');
    this._playerState= PlayerState.STOP; //estado del player



	//nombre de la animación, frames, framerate, isloop
    //this.animations.add('run',[3,4,5],10,true);
    this.animations.add('stopDown',[0],0,false);
    this.animations.add('runDown',[1,2],5,true);

    this.animations.add('stopUp',[3],0,false);
    this.animations.add('runUp',[4,5],5,true);

    this.animations.add('stopRight',[6],0,false);
    this.animations.add('runRight',[7,6,8],5,true);

    this.animations.add('stopLeft',[9],0,false);
    this.animations.add('runLeft',[10,9,11],5,true);

    //this.animations.add('jump',[6,7],5,false);
    //this.animations.add('fall',[8],5,false);
    //this.animations.add('unhand',[21,22,23],10,false);
    //this.animations.add('grab',[19,20],30,false);//Animación de agarre

    //this.jumpSound = this.game.add.audio('jumpSound');
    //this.jumpSound.volume = 0.5;

    //Gravedad del juego
    //this.body.bounce.y = 0.2;

    //Velocidad del jugador
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;


    this.posCamaX = posX;
    this.posCamaY = posY;

    this.invisibilidad = false;         //bool

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
                

                if (this._direction === Direction.DOWN){

                    this.animations.play('runDown');
                }


                if (this._direction === Direction.UP)
                this.animations.play('runUp');


                if (this._direction === Direction.RIGHT)
                this.animations.play('runRight');


                if (this._direction === Direction.LEFT)
                this.animations.play('runLeft');
            }
            else
            {
                this._playerState = PlayerState.STOP;

                if (this._direction === Direction.DOWN)
                this.animations.play('stopDown');


                if (this._direction === Direction.UP)
                this.animations.play('stopUp');


                if (this._direction === Direction.RIGHT)
                this.animations.play('stopRight');


                if (this._direction === Direction.LEFT)
                this.animations.play('stopLeft');
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
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        movement = Direction.RIGHT;
        this._direction = Direction.RIGHT;
    }
        
    //Move Left
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        movement = Direction.LEFT;
        this._direction = Direction.LEFT;
    }

       //Move Up
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        movement = Direction.UP;
        this._direction = Direction.UP;
    }

       //Move Down
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        movement = Direction.DOWN;
        this._direction = Direction.DOWN;
    }


        
    return movement;



};

Player.prototype.getPosX = function (){
    return this.body.x;
};


Player.prototype.getPosY = function (){
   return this.body.y;
};

Player.prototype.getPosCamaX = function (){
    return this.posCamaX;
};


Player.prototype.getPosCamaY = function (){
   return this.PosCamaY;
};

Player.prototype.setPosPj = function(ALaCamaX, ALaCamaY) {
    this.body.x = ALaCamaX;
    this.body.y = ALaCamaY;

}

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
       
/*function circuloLuz (game, diametro){
    //Entity.call(this,game,200,Direction.NONE,posIniX, posIniY,'luz'); 

    this.diametro = diametro;
    this.radio = this.diametro/2;

    Phaser.Sprite.call(this,game,posX,posY,name);
    this.circuloGuardia = Phaser.Circle(posIniX, posIniY, this.diametro)
}

circuloLuz.prototype = Object.create(Entity.prototype);//Ajustamos el prototipo
circuloLuz.constructor = circuloLuz;
*/
/////////////////POLY GUARDIA////////////////////
/////////////////GUARDIA////////////////////
function Guardia(game,posCreacionX,posCreacionY,player){

    Entity.call(this,game,200,Direction.NONE,posCreacionX, posCreacionY,'guardia'); 
   // this.animations.add('walk',[1,2],10,true);
    //this.animations.add('dead',[3],1,false);
    //this.animations.play('walk');
    this.player = player;
    this._estActGuardia = estadosGuardia.SOSEGADO;

  
};

Guardia.prototype = Object.create(Entity.prototype);//Ajustamos el prototipo
Guardia.constructor = Guardia;

Guardia.prototype.updateGuardia_ = function()        //Se llama igual para evitar movidas? 
{

    if (this.game.physics.arcade.collide(this.player, this)){
        this.player.setPosPj(this.player.getPosCamaX(), 300);
        this.game.dia++;
    }

    //Hallamos la distancia
    this.distance = Math.sqrt(  ((this.player.getPosX()-this.body.x) *(this.player.getPosX()-this.body.x)) 
     +   ((this.player.getPosY()-this.body.y)*(this.player.getPosY()-this.body.y)));

    //Comprobamos si el jugador está en el area del guardia
    if(this.distance <= 300 && this.distance >= 1) {
        this._estActGuardia = estadosGuardia.ALERTA;
    }

    else this._estActGuardia = estadosGuardia.SOSEGADO; 

    //En función del nuevo estado, vamos a añadir o no un parámetro a la velocidad
    var adder;
    if (this._estActGuardia === estadosGuardia.SOSEGADO) {
        this.adder = 1;

    }
    else if (this._estActGuardia === estadosGuardia.ALERTA){
        this._direction = Direction.UP;
        this.adder = 2*5;
    }


  

    //Switch entre los dos tipos de movimiento del guardia

    switch(this._estActGuardia){


         case estadosGuardia.SOSEGADO:

         var moveDirection = new Phaser.Point(0, 0);

            if(this._direction === Direction.RIGHT){
            moveDirection.x = (this._speed*this.adder);
            //this.changeDirectionLeft();
            }
            else if (this._direction === Direction.LEFT){
                moveDirection.x = -(this._speed*this.adder);
                //this.changeDirectionRight();
            }

            else if (this._direction === Direction.UP){
                moveDirection.y = -(this._speed*this.adder);

                //this.changeDirectionUp();
            }
            else if (this._direction === Direction.DOWN){
                moveDirection.y = (this._speed*this.adder);
                //this.changeDirectionDown();
            }
        break;


        case estadosGuardia.ALERTA:
             var moveDirection = new Phaser.Point(this.player.getPosX(), this.player.getPosY());
    
            if (this.body.x != moveDirection.x && this.body.y != moveDirection.y ) {
                this.game.physics.arcade.moveToXY(this,moveDirection.x,moveDirection.y,60,0);
            }
        break;
    

    //this.changeDirectionGuardia();
    this.movement(moveDirection.x, moveDirection.y);
    }
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
