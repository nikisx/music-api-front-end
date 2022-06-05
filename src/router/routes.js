import HomeView from '../views/HomeView.vue'
import Login from '../components/Authentication/Login.vue'
import Register from '../components/Authentication/Register.vue'
import Albums from '../components/Albums/Albums.vue'
import Playlists from '../components/Playlists/Playlists.vue'
import Playlist from '../components/Playlists/Playlist.vue'

export default[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/albums',
    name: 'albums',
    component: Albums
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: Playlist
  },
]
