// emitter.js
// author: Tony Jefferson
// last modified: 3/12/2014

"use strict";
var app = app || {};

app.Emitter=function(){

	function Emitter(){
		// public
		this.numParticles = 25;
		this.useCircles = true;
		this.useSquares = false;
		this.xRange = 4;
		this.yRange = 4;
		this.minXspeed = -1;
		this.maxXspeed = 1;
		this.minYspeed = 2;
		this.maxYspeed = 4;
		this.startRadius = 4;
		this.expansionRate = 0.3
		this.decayRate = 2.5;
		this.lifetime = 100;
		this.red = 0;
		this.green = 0;
		this.blue = 0;
		
		// private
		this._particles = undefined;
	};
	
	// "class" property
	Emitter.utils = undefined;
	
	// "public" methods
	var p=Emitter.prototype;
	
	p.createParticles = function(emitterPoint){
		// CODE GOES HERE
		
		this._particles = [];
		
		//Exhaust particles
		for(var i=0; i<this.numParticles; i++){
			var p = {};
			this._particles.push(initParticle(this,p,emitterPoint));
		}
		
		// log the particles
		console.log(this._particles );
	};
	
	p.updateAndDraw = function(ctx, emitterPoint){
			/* move and draw particles */
			// each frame, loop through particles array
			// move each particle down screen, and slightly left or right
			// make it bigger, and fade it out
			// increase its age so we know when to recycle it
			
			// CODE GOES HERE
					
			for(var i=0; i<this._particles.length; i++){
				var p = this._particles[i];
				
				p.age += this.decayRate;
				p.r += this.expansionRate;
				p.x += p.xSpeed;
				p.y += p.ySpeed;
				
				var alpha = 1-p.age/this.lifetime;
				
				if(this.useSquares){
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")";
					
					ctx.fillRect(p.x,p.y,p.r,p.r);
				}
				if(this.useCircles){
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")";
					
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
					ctx.closePath();
					ctx.fill();
				}
				
				if(p.age >= this.lifetime){
					initParticle(this,p,emitterPoint);
				}
				
			}
				
	} // end updateAndDraw()
			
			
			
	// "private" method
	function initParticle(obj, p, emitterPoint){
		
		// give it a random age when first created
		p.age = Emitter.utils.getRandomInt(0,obj.lifetime);
				
		p.x = emitterPoint.x + Emitter.utils.getRandom(-obj.xRange, obj.xRange);
		p.y = emitterPoint.y + Emitter.utils.getRandom(0, obj.yRange);
		p.r = Emitter.utils.getRandom(obj.startRadius/2, obj.startRadius); // radius
		p.xSpeed = Emitter.utils.getRandom(obj.minXspeed, obj.maxXspeed);
		p.ySpeed = Emitter.utils.getRandom(obj.minYspeed, obj.maxYspeed);
		return p;
	};
	
	
	
	return Emitter;
}();