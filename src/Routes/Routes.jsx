// Import layouts
import { OnlyHeaderLayout } from '~/layouts';

// Import pages
import Home from '~/pages/Home/Home';
import Chat from '~/pages/Chat/Chat';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Upload/Upload';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: OnlyHeaderLayout },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
