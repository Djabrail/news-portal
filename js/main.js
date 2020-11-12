const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('.sidebar');
const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const loginSignup = document.querySelector('.login-signup')
const userElem = document.querySelector('.user')
const userNameElem = document.querySelector('.user-name')
const exitElem = document.querySelector('.exit')
const editElem = document.querySelector('.edit')
const editContainer = document.querySelector('.edit-container')
const editUsername = document.querySelector('.edit-username')
const editPhotoURL = document.querySelector('.edit-photo')
const userAvatarElem = document.querySelector('.user-avatar')
const postsWrapper = document.querySelector('.posts')

const regExpValidEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

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
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName
    }
    if (userPhoto) {
      this.user.photo = userPhoto
    }
    handler()
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  autorizedUser(user) {
    this.user = user
  }
}


const setPosts = {
  allPosts: [
    {
      title: 'Заголовок',
      text: 'Текст',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайное'],
      author: 'Sakinat@mail.ru',
      datePost: '12.11.2020, 20:54:00',
      like: 15,
      comments: 20
    },
    {
      title: 'Заголовок 2',
      text: 'Текст',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайное'],
      author: 'Djabrail@mail.ru',
      datePost: '2.11.2020, 20:54:00',
      like: 15,
      comments: 20
    }
  ]
}

const toggleAuthDom = () => {
  const user = setUser.user
  if (user) {
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElem.textContent = user.displayName
    userAvatarElem.src = user.photo || userAvatarElem.src
  } else {
    loginElem.style.display = ''
    userElem.style.display = 'none'
  }
}

const showAllPosts = () => {

  let postsHTML = ''
  setPosts.allPosts.forEach(post => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-text">${post.text}</p>
      <div class="tags">
        <a href="#" class="tag">#свежее</a>
        <a href="#" class="tag">#новое</a>
        <a href="#" class="tag">#горячее</a>
        <a href="#" class="tag">#мое</a>
        <a href="#" class="tag">#случайность</a>
      </div>
      <!-- /.tags -->
    </div>
    <!-- /.post-body -->
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">26</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">157</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">djabrail</a>
          <span class="post-time">5 минут назад</span>
        </div>
        <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `
  })

  postsWrapper.innerHTML = postsHTML || 'Постов нету'
}

const init = () => {

  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
  })

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
  
  editElem.addEventListener('click', event => {
    event.preventDefault()
    editContainer.classList.toggle('visible')
    editUsername.value = setUser.user.displayName
  })
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault()
    setUser.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
    editContainer.classList.remove('visible')
  })

  showAllPosts()
  toggleAuthDom()
}

document.addEventListener('DOMContentLoaded', init)
