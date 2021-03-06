import Contact from '../components/Contact'
import Research from '../components/Research'
import Home from '../components/Home'
import CardLink from '../components/CardLink'
import Apex from '../components/Apex'
import Builder from '../components/Builder'
import Signin from '../components/Signin'
import Party from '../components/Party'

export default [
  {
    path: '/',
    text: 'Home',
    Component: Home,
    isNav: true
  },
  {
    path: '/party',
    text: 'Party',
    Component: Party
  },
  {
    path: '/research',
    text: 'Research',
    Component: Research,
    isNav: true
  },
  {
    path: '/contact',
    text: 'Contact',
    Component: Contact,
    isNav: true
  },
  {
    path: '/apex',
    text: 'Apex',
    Component: Apex,
    isNav: false
  },
  {
    path: '/builder',
    text: 'Builder',
    Component: Builder,
    isNav: false
  },
  {
    path: '/card',
    text: 'Link Card',
    Component: CardLink
  },
  {
    path: '/signin',
    text: 'Signin',
    Component: Signin
  }
]

// import Escrow from '../components/Escrow'
// import CreateUser from '../components/CreateUser'
// import CardLink from '../components/CardLink'
// import Apex from '../components/Apex'
//
// export default [
//   {
//     path: '/createUser',
//     text: 'Create User',
//     Component: CreateUser
//   },
//   {
//     path: '/escrow',
//     text: 'Escrow',
//     Component: Escrow
//   },

//   {
//     path: '/card',
//     text: 'Link Card',
//     Component: CardLink
//   }
// ]
