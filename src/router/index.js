import { createRouter, createWebHashHistory } from 'vue-router'
import ConcertList from '../components/ConcertList.vue'
import Concert from '../components/Concert.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import AddEvent from '../components/AddEvent.vue'
import MyError from '../components/MyError.vue'
import Success from '../components/Success.vue'
import AddTicket from '../components/AddTicket.vue'
import PersonalCab from '../components/PersonalCab.vue'


const routes = [
  {
    path: '/',
    name: 'ConcertList',
    component: ConcertList
  },

   {
    path:'/concert/:id',
    name: 'concert',
    component: Concert

  } ,

  {
    path: '/personalCab',
    name: 'personalCab',
    component: PersonalCab
  },

  {
    path:'/login',
    name: 'login',
    component: Login

  },
  {
    path:'/register',
    name: 'register',
    component: Register

  },
  {
    path:'/addEvent/:id',
    name: 'addEvent',
    component: AddEvent

  },
  {
    path:'/myError',
    name: 'myError',
    component: MyError

  },
  {
    path:'/success',
    name: 'success',
    component: Success

  },

  {
    path:'/addTicket/:id/:concertId',
    name: 'addTicket',
    component: AddTicket

  },



  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
