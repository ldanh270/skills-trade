// Import layouts
import { NoHeaderLayout } from '~/layouts'
import Chat from '~/pages/Chat/Chat'
import ChatAI from '~/pages/ChatAI/ChatAI'
// Import pages
import Home from '~/pages/Home/Home'
import Landing from '~/pages/Landing/Landing'
import Login from '~/pages/Login/Login'
import PostDetail from '~/pages/PostDetail/PostDetail'
import Profile from '~/pages/Profile/Profile'
import ResetPW from '~/pages/ResetPW/ResetPW'
import Signup from '~/pages/Signup/Signup'
import TxHistory from '~/pages/TxHistory/TxHistory'
import Upload from '~/pages/Upload/Upload'

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload },
    { path: '/login', component: Login, layout: NoHeaderLayout },
    { path: '/signup', component: Signup, layout: NoHeaderLayout },
    { path: '/posts/:postId', component: PostDetail },
    { path: '/chat-ai', component: ChatAI },
    { path: '/transaction', component: TxHistory },
    { path: '/reset-passwords', component: ResetPW, layout: NoHeaderLayout },
    { path: '/landing', component: Landing, layout: NoHeaderLayout },
]

// Private routes
const privateRoutes = []

export { privateRoutes, publicRoutes }
