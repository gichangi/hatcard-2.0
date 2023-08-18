import { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
//import { BASE_URL } from './config/constant';
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
                permission:['view-homepage'],
                exact: true,
                path: '/home',
                component: lazy(() => import('./views/homepage'))
            },
            {
                permission:['view-homepage'],
                exact: true,
                path: '/profile',
                component: lazy(() => import('./views/user-profile'))
            },
            {
                exact: true,
                path: '/admin/explore',
                component: lazy(() => import('./views/menu-cards'))
            },

            {
                permission:['Roles-view','Roles-create','Roles-edit','Roles-delete'],
                exact: true,
                path: '/admin/roles',
                component: lazy(() => import('./views/admin/roles'))
            },
            {
                exact: true,
                path: '/admin/menu-management',
                component: lazy(() => import('./views/admin/menumanagement'))
            },
            {
                permission:['Users-view','Users-create','Users-edit','Users-delete'],
                exact: true,
                path: '/admin/users',
                component: lazy(() => import('./views/admin/users'))
            },
            {
                permission:['Sidebar-view','Sidebar-create','Sidebar-edit','Sidebar-delete'],
                exact: true,
                path: '/admin/sidebar/menuitem',
                component: lazy(() => import('./views/admin/menumanagement/navigation'))
            },
            {
                permission:['Organisations-view','Organisations-create','Organisations-edit','Organisations-delete'],
                exact: true,
                path: '/admin/organisation',
                component: lazy(() => import('./views/admin/organisations'))
            },
            {
                permission:['Bi-Platforms-view','Bi-Platforms-create','Bi-Platforms-edit','Bi-Platforms-delete'],
                exact: true,
                path: '/admin/bi-platforms',
                component: lazy(() => import('./views/admin/bi-platforms'))
            },
            {
                permission:['Bi-Dashboards-view','Bi-Dashboards-create','Bi-Dashboards-edit','Bi-Dashboards-delete'],
                exact: true,
                path: '/admin/bi-dashboards',
                component: lazy(() => import('./views/admin/bi-dashboards'))
            },
            {
                permission:['Bi-Dashboards-view'],
                exact: true,
                path: '/dashboards/view',
                component: lazy(() => import('./views/dashboards'))
            },

            // {
            //     path: '*',
            //     exact: true,
            //     component: () => <Redirect to={BASE_URL} />
            // }
        ]

    }
];

export default routes;
