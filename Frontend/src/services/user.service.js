import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
}

window.userService = userService

function getUsers() {
  return storageService.query('user')
  // return httpService.get(`user`)
}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  // const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  const user = await storageService.get('user', _id)
  user.score = score
  await storageService.put('user', user)

  // const user = await httpService.put(`user/${_id}`, {_id, score})
  // // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  const users = await storageService.query('user')
  const user = users.find((user) => user.username === userCred.username)
  // const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}

async function signup(userCred) {
 
  const user = await storageService.post('user', userCred)
  // const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    score: user.score,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async () => {
//   await userService.signup({
//     _id: 'u101',
//     fullName: 'Peter Parker',
//     imgUrl:
//       'https://qph.cf2.quoracdn.net/main-qimg-9fde28d147c243b690bdf975f8474145-lq',
//     username: 'peter123',
//     password: '123',
//     level: 'level 2',
//     rating: 4.9,
//     isAdmin: false,
//   })
//   await userService.signup({
//     _id: 'u102',
//     fullName: 'Jane Doe',
//     username: 'jane123',
//     password: '123',
//     imgUrl:
//       'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
//     level: 'level 1',
//     rate: 4.9,
//     isAdmin: true
//   })
// })

const users = [
    {
      _id: 'u101',
      fullName: 'Peter Parker',
      imgUrl:
        'https://qph.cf2.quoracdn.net/main-qimg-9fde28d147c243b690bdf975f8474145-lq',
      username: 'peter123',
      password: '123',
      level: 'level 2',
      rating: '4.9',
      isAdmin: false
    },
    {
      _id: 'u102',
      fullName: 'Jane Doe',
      username: 'jane123',
      password: '123',
      imgUrl:
        'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
      level: 'level 1',
      rate: '4.9',
      isAdmin: true
    },
  ]
_createUsers()

  function _createUsers(){
    localStorage.setItem('users',JSON.stringify(users))
  }