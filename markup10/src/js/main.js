const countries = "Австралия_Австрия_Азербайджан_Албания_Алжир_Ангола_Андорра_Антигуа и Барбуда_Аргентина_Армения_Афганистан_Багамы_Бангладеш_Барбадос_Бахрейн_Белоруссия_Белиз_Бельгия_Бенин_Болгария_Боливия_Босния и Герцеговина_Ботсвана_Бразилия_Бруней_Буркина-Фасо_Бурунди_Бутан_Вануату_Великобритания_Венгрия_Венесуэла_Восточный Тимор_Вьетнам_Габон_Гаити_Гайана_Гамбия_Гана_Гватемала_Гвинея_Гвинея-Бисау_Германия_Гондурас_Гренада_Греция_Грузия_Дания_Джибути_Доминика_Доминиканская Республика_Египет_Замбия_Зимбабве_Израиль_Индия_Индонезия_Иордания_Ирак_Иран_Ирландия_Исландия_Испания_Италия_Йемен_Кабо-Верде_Казахстан_Камбоджа_Камерун_Канада_Катар_Кения_Кипр_Киргизия_Кирибати_КНР_Колумбия_Коморы_Республика Конго_Демократическая Республика Конго_КНДР_Республика Корея_Коста-Рика_Кот-д’Ивуар_Куба_Кувейт_Лаос_Латвия_Лесото_Либерия_Ливан_Ливия_Литва_Лихтенштейн_Люксембург_Маврикий_Мавритания_Мадагаскар_Македония_Малави_Малайзия_Мали_Мальдивы_Мальта_Марокко_Маршалловы Острова_Мексика_Мозамбик_Молдавия_Монако_Монголия_Мьянма_Намибия_Науру_Непал_Нигер_Нигерия_Нидерланды_Никарагуа_Новая Зеландия_Норвегия_ОАЭ_Оман_Пакистан_Палау_Панама_Папуа — Новая Гвинея_Парагвай_Перу_Польша_Португалия_Россия_Руанда_Румыния_Сальвадор_Самоа_Сан-Марино_Сан-Томе и Принсипи_Саудовская Аравия_Свазиленд_Сейшельские Острова_Сенегал_Сент-Винсент и Гренадины_Сент-Китс и Невис_Сент-Люсия_Сербия_Сингапур_Сирия_Словакия_Словения_США_Соломоновы Острова_Сомали_Судан_Суринам_Сьерра-Леоне_Таджикистан_Таиланд_Танзания_Того_Тонга_Тринидад и Тобаго_Тувалу_Тунис_Туркмения_Турция_Уганда_Узбекистан_Украина_Уругвай_Федеративные Штаты Микронезии_Фиджи_Филиппины_Финляндия_Франция_Хорватия_Центральноафриканская Республика_Чад_Черногория_Чехия_Чили_Швейцария_Швеция_Шри-Ланка_Эквадор_Экваториальная Гвинея_Эритрея_Эстония_Эфиопия_ЮАР_Южный Судан_Ямайка_Япония_Ватикан_Государство Палестина_Ниуэ_Острова Кука_Республика Абхазия_Республика Косово_Северный Кипр_Китайская Республика_Южная Осетия_Сахарская Арабская Демократическая Республика_ДНР_ЛНР_НКР_Приднестровье_Сомалиленд_Азад Кашмир";

const App = {
  input: null,
  list: null,

  init() {
    this.input = document.getElementById('text');
    this.list = document.getElementById('list');

    this.handlers();
  },

  handlers() {
    this.input.addEventListener('keyup', function(e) { App.onKeyUp(e); });
    this.list.addEventListener('click', function(e) { App.onSelect(e); });
  },

  onSelect(e) {
    this.setValue(e.target);
    this.input.value = e.target.textContent;
    this.input.focus();
    this.list.innerHTML = '';
  },

  onKeyUp(e) {
    const val = this.input.value.toLowerCase();
    let code = e.which;
    if (code === null) { code = e.keyCode; }


    if (code === 13) {
      this.list.innerHTML = '';
    }

    if ([38, 40].includes(code)) {
      this.navigate(code);
    }

    if ((code < 60) && ![8, 32, 46].includes(code)) {
      return;
    }



    let list = '';
    if (val) {
      countries.split('_').forEach(item => {
        if (item.toLowerCase().includes(val)) {
          list += `<li>${item}</li>`;
        }
      });
    }
    this.render(list);
  },

  render(list) {
    this.list.innerHTML = list;
  },

  navigate(code) {
    const active = document.querySelector('li.active');
    if (active) {
      const sibling = code === 40 ? active.nextElementSibling : active.previousElementSibling;
      if (sibling) {
        active.classList.remove('active');
        sibling.classList.add('active');
        this.setValue(sibling);

        this.list.scrolltop += (sibling.offsetHeight - thislist.offsetHeight);

        console.log(
          this.list.scrolltop,
          sibling.offsetTop,
          sibling.offsetHeight,
          this.list.offsetHeight);

        this.list.scrolltop = sibling.offsetTop - this.list.offsetHeight + sibling.offsetHeight;


      }
    } else {
      const side = code === 40 ? this.list.firstElementChild : this.list.lastElementChild; 
      if (side) {
        side.classList.add('active');
        this.setValue(side);
      }
    }
  },

  setValue(el) {
    this.input.value = el.textContent;
  }

};

$(document).ready(() => {
  App.init();
});






// const App = {
//   toDo: null,
//   input: null,
//   add: null,
//   remove: null,
//   state: [],

//   init() {
//     this.toDo = document.getElementById('to-do');
//     this.input = document.getElementById('text');
//     this.add = document.getElementById('add');
//     this.remove = document.getElementById('remove');

//     this.handlers();
//     this.getState();
//     this.render();
//   },

//   handlers() {
//     this.add.addEventListener('click', function() { App.onAdd(); });
//     this.remove.addEventListener('click', function() { App.onRemove(); });
//     this.input.addEventListener('keyup', function(e) { App.onKeyUp(e); });
//   },

//   onAdd() {
//     const value = this.input.value;
//     if (value) {
//       this.state.push({checked: false, text: value});
//       this.render();
//       this.input.value = '';
//       this.saveState();
//     }
    
//   },

//   onRemove() {
//     this.state = this.state.filter(item => !item.checked);
//     this.render();
//     this.saveState();
//   },

//   onKeyUp(e) {
//     if (e.keyCode === 13) {
//       this.onAdd();
//     }
//   },

//   createItem(text, checked = false) {
//     return `<li><label><input type="checkbox" ${checked ? 'checked' : ''}>${text}</label></li>`;
//   },

//   render() {
//     const list = this.state.map(item => {
//       return App.createItem(item.text, item.checked);
//     });
//     this.toDo.innerHTML = list.join('');
//     this.setHandlers();
//   },

//   setHandlers() {
//     const list = document.querySelectorAll('[type=checkbox]');
//     [...list].forEach((item, i) => {
//       item.addEventListener('change', function() {
//         App.state[i].checked = this.checked;
//         App.saveState();
//       });
//     });
//   },

//   saveState() {
//     localStorage.setItem('to-do', JSON.stringify(App.state));
//   },

//   getState() {
//     this.state = JSON.parse(localStorage.getItem('to-do')) || [];
//   }
// };

// $(document).ready(() => {
//   App.init();
// });
