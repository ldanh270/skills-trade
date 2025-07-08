// Import libraries
import { Fragment } from 'react';
import clsx from 'clsx';
import { Routes, Route } from 'react-router-dom';

// Import styles
import * as styles from './App.module.scss';

// Import components
import { publicRoutes } from './routes/routes';
import { DefaultLayout } from '~/components/layouts';

function App() {
    return (
        <div className={clsx(styles.App, styles.container)}>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
