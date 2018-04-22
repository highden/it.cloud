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





// function User(name) {
//   if (!(this instanceof User)) {
//     throw new Error('Call without new!');
//   }


//   this.name = name;
//   this.sayHi = function() {
//     alert('My name ' + this.name);
//   }
// }

// User.prototype.fn = function() {
//   return 1;
// }

// User.fn = function() {
//   return 1;
// }


// var admin = new User('Admin');
// console.log(User.fn());

// User('rrr');

// console.log(admin2 instanceof User);


const App = {
  toDo: null,
  input: null,
  add: null,
  remove: null,
  state: [],

  init() {
    this.toDo = document.getElementById('to-do');
    this.input = document.getElementById('text');
    this.add = document.getElementById('add');
    this.remove = document.getElementById('remove');

    this.handlers();
    this.getState();
    this.render();
  },

  handlers() {
    this.add.addEventListener('click', function() { App.onAdd(); });
    this.remove.addEventListener('click', function() { App.onRemove(); });
    this.input.addEventListener('keyup', function(e) { App.onKeyUp(e); });
    
  },

  onAdd() {
    const value = this.input.value;
    if (value) {
      this.state.push({checked: false,text: value});
      this.input.value = '';
      this.render();
      this.saveState();
      // const li = this.createItem(value);
      // this.toDo.appendChild(li);
    }
    
  },

  onRemove() {
    this.state = this.state.filter(item => !item.checked);
    this.render();
    this.saveState();
    // const checked = document.querySelectorAll('[type=checkbox]:checked');
    // [...checked].forEach(item => {
    //   item.closest('li').remove();
    // });
  },

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onAdd();
    }
  },

  createItem(text, checked = false) {
    
    return `<li><label><input type="checkbox" ${checked ? 'checked' : ''} ${text} </label></li>`;

  },

  render() {
    const list = this.state.map(item => {
      return App.createItem(item.text, item.checked);
    });
    this.toDo.innerHTML = list.join('');
    this.setHandlers();
  },

  setHandlers() {
    const list = document.querySelectorAll('[type=checkbox]');
    [...list].forEach((item,i) => {
      item.addEventListener('change', function() {
        App.state[i].checked = this.checked;
      });
    });
  },

  saveState() {
    localStorage.setItem('to-do', JSON.stringify(App.state));
  },

  getState() {
    this.state = JSON.parse(localStorage.getItem('to-do'))
  }
};

$(document).ready(() => {
  App.init();
});
