import { Routes, Route } from 'react-router-dom';
import * as styles from './App.module.scss';
import { publicRoutes } from './Routes/Routes';

function App() {
    return (
        <div className={styles['App']}>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
