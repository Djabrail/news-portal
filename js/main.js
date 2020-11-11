// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const regExpValidEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const loginSignup = document.querySelector('.login-signup')

const userElem = document.querySelector('.user')
const userNameElem = document.querySelector('.user-name')

const exitElem = document.querySelector('.exit')




const listUsers = [
  {
    id: '01',
    email: 'Djabrail@mail.ru',
    password: '12345',
    displayName: 'DjabrailJS'
  },
  {
    id: '02',
    email: 'Sakinat@mail.ru',
    password: '12345',
    displayName: 'SakinatJS'
  }
]

const setUser = {
  user: null,
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email не валиден')
      return
    }

    const user = this.getUser(email)
    if (user && user.password === password) {
      this.autorizedUser(user)
      handler()
    } else {
      alert('Пользователь с такими данными не найден')
    }
  },
  logOut(handler) {
    this.user = null
    handler()
  },
  signUp(email, password, handler) {

    if(!regExpValidEmail.test(email)) {
      alert('email не валиден')
      return
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return
    }

    if (!this.getUser(email)) {
      const user = {email, password, displayName: email.split('@')[0]}
      listUsers.push(user)
      this.autorizedUser(user)
      handler()
    } else {
      alert('Пользователь с таким email уже зарегистрирован')
    }
  },
  getUser(email) {
    // let user = null
    // for(let i=0; i < listUsers.length; i++) {
    //   if (listUsers[i].email === email) {
    //     user = listUsers[i]
    //     break
    //   }
    // }
    // return user

    return listUsers.find(item => item.email === email)
  },
  autorizedUser(user) {
    this.user = user
  }
}


const toggleAuthDom = () => {
  const user = setUser.user

  if (user) {
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElem.textContent = user.displayName
  } else {
    loginElem.style.display = ''
    userElem.style.display = 'none'
  }
}

loginForm.addEventListener('submit', event => {
  event.preventDefault()
  setUser.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
})

loginSignup.addEventListener('click', event => {
  event.preventDefault()
  setUser.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
  loginForm.reset()
})

exitElem.addEventListener('click', event => {
  event.preventDefault()
  setUser.logOut(toggleAuthDom)
})

toggleAuthDom()