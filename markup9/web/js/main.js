"use strict";function User(n){if(!(this instanceof User))throw new Error("Call without new!");this.name=n,this.sayHi=function(){alert("My name "+this.name)}}User.fn=function(){return 1};var admin=new User("Admin");console.log(User.fn()),User("rrr"),console.log(admin2 instanceof User);var App={init:function(){this.handlers()},handlers:function(){$("body").on("click",function(){App.onClick(this)})},onClick:function(n){console.log("Click",n)}};$(document).ready(function(){App.init()});
//# sourceMappingURL=main.js.map