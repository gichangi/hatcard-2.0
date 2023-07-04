import { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';


export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    {
        exact: true,
        guard: GuestGuard,
        path: '/',
        component: lazy(() => import('./views/landing/LandingPage'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/vsp',
        component: lazy(() => import('./views/landing/VspPage'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/pms',
        component: lazy(() => import('./views/landing/ProgressiveModelPage'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/login',
        component: lazy(() => import('./views/auth/signin/SignIn'))
    },
    {
        path: '*',
        layout: AdminLayout,
        guard: AuthGuard,
        routes: [
            {
                exact: true,
                path: '/explore',
                component: lazy(() => import('./views/menu-cards'))
            },
            {
                exact: true,
                path: '/sample-page',
                component: lazy(() => import('./views/extra/SamplePage'))
            },
            {
                exact: true,
                path: '/admin/menu-management',
                component: lazy(() => import('./views/admin/MenuManagement'))
            },
            {
                exact: true,
                path: '/admin/users',
                component: lazy(() => import('./views/admin/MenuManagement'))
            },
            {
                exact: true,
                path: '/admin/menu-management/menuitem',
                component: lazy(() => import('./views/admin/MenuManagement/Navigation'))
            },
            {
                exact: true,
                path: '/admin/organisation',
                component: lazy(() => import('./views/admin/Organisations'))
            },
            {
                exact: true,
                path: '/admin/bi-platforms',
                component: lazy(() => import('./views/admin/BI-Platforms'))
            },
            {
                exact: true,
                path: '/admin/bi-dashboards',
                component: lazy(() => import('./views/admin/BI-Dashboards'))
            },
            {
                exact: true,
                path: '/dashboards/view',
                component: lazy(() => import('./views/dashboards/Tableau/ViewTableauServer'))
            }
        ]

    }
];

export default routes;
