// var user = {
//   name: "Denis",

//   sayHi: function() {
//     alert('Hi' + this.name);
//   }
// };

// user.sayHi();




// var user = { name: 'Denis'};
// var admin = { name: 'Admin'};

// function func() {
//   alert(this.name);
// }

// user.f = func;
// admin.f = func;


// user.f();
// admin.f();




// var user = {
//   name: 'Vasya',
//   hi: function(text, text2) {
//     console.log(text + text2 + this.name);
//   }
// }

// var hi = user.hi;

// hi.apply(user, ['Привет', 'пока']);

// function func(first) {
//   return function(second) {
//     return first + second;
//   }
// }

// function sum(first, second) {
//   return first + second;
// }

// var sub = func(5);
// console.log(sub(7));

// var res = func(5)(7);
// var res2 = sum(5,7)
// console.log(res);





function User(name) {
  if (!(this instanceof User)) {
    throw new Error('Call without new!');
  }


  this.name = name;
  this.sayHi = function() {
    alert('My name ' + this.name);
  }
}

User.fn = function() {
  return 1;
}


var admin = new User('Admin');
console.log(User.fn());

User('rrr');

console.log(admin2 instanceof User);


const App = {
  init() {
    this.handlers();
  },

  handlers() {
    $('body').on('click', function() { App.onClick(this); });
  },

  onClick(el) {
    console.log('Click', el);
  }
};

$(document).ready(() => {
  App.init();
});
