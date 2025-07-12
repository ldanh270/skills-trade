import { Fragment } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { fetchUser } from '~/api/user'
import { DefaultLayout } from '~/layouts'
import { setUser } from '~/redux/slices/userSlice'

import styles from './App.module.scss'
import { publicRoutes } from './routes/routes'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadUser = async () => {
            const data = await fetchUser()
            dispatch(setUser(data))
        }
        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
