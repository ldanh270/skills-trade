// Import layouts
import { OnlyHeaderLayout } from '~/layouts'
import Chat from '~/pages/Chat/Chat'
// Import pages
import Home from '~/pages/Home/Home'
import Login from '~/pages/Login/Login'
import Profile from '~/pages/Profile/Profile'
import Signup from '~/pages/Signup/Signup'
import Upload from '~/pages/Upload/Upload'

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: OnlyHeaderLayout },
    { path: '/login', component: Login, layout: OnlyHeaderLayout },
    { path: '/signup', component: Signup, layout: OnlyHeaderLayout },
]

// Private routes
const privateRoutes = []

export { privateRoutes, publicRoutes }
