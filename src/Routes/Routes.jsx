// Import layouts
import { NoHeaderLayout } from '~/layouts'
import Chat from '~/pages/Chat/Chat'
// Import pages
import Home from '~/pages/Home/Home'
import Login from '~/pages/Login/Login'
import PostDetail from '~/pages/PostDetail/PostDetail'
import Profile from '~/pages/Profile/Profile'
import Signup from '~/pages/Signup/Signup'
import Upload from '~/pages/Upload/Upload'
import ResetPW from '~/pages/ResetPW/ResetPW'
import Landing from '~/pages/Landing/Landing'   

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload },
    { path: '/login', component: Login, layout: NoHeaderLayout },
    { path: '/signup', component: Signup, layout: NoHeaderLayout },
    { path: '/posts/:postId', component: PostDetail },
    { path: '/reset-password', component: ResetPW , layout: NoHeaderLayout },
    { path: '/landing', component: Landing , layout: NoHeaderLayout },
]

// Private routes
const privateRoutes = []

export { privateRoutes, publicRoutes }
