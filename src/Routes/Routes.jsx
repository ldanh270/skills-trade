import Home from '~/pages/Home/Home';
import Chat from '~/pages/Chat/Chat';
import Profile from '~/pages/Profile/Profile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/profile', component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
