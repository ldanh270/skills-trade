import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '~/layouts'

import * as styles from './App.module.scss'
import { publicRoutes } from './routes/routes'

const App = () => {
    return (
        <div className={styles['App']}>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout

                    if (route.layout) {
                        Layout = route.layout
                    } else if (route.layout === null) {
                        Layout = Fragment
                    }

                    const Page = route.component

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
                    )
                })}
            </Routes>
        </div>
    )
}

export default App
