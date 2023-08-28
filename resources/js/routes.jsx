import { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
//import { BASE_URL } from './config/constant';
import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';
import {useSelector} from "react-redux";


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

export const routes = [
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
        path: '/vsp-routine',
        component: lazy(() => import('./views/landing/VspRoutinePage'))
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
                permission:['ALL','View-homepage'],
                exact: true,
                path: '/home',
                component: lazy(() => import('./views/homepage'))
            },
            {
                permission:['ALL','View-profile'],
                exact: true,
                path: '/profile',
                component: lazy(() => import('./views/user-profile'))
            },
            {
                permission:['ALL','View-explore'],
                exact: true,
                path: '/admin/explore',
                component: lazy(() => import('./views/menu-cards'))
            },

            {
                permission:['ALL','Roles-view','Roles-create','Roles-edit','Roles-delete'],
                exact: true,
                path: '/admin/roles',
                component: lazy(() => import('./views/admin/roles'))
            },
            {
                permission:['ALL','Menu-view','Menu-create','Menu-edit','Menu-delete'],
                exact: true,
                path: '/admin/menu-management',
                component: lazy(() => import('./views/admin/menumanagement'))
            },
            {
                permission:['ALL','Users-view','Users-create','Users-edit','Users-delete'],
                exact: true,
                path: '/admin/users',
                component: lazy(() => import('./views/admin/users'))
            },
            {
                permission:['ALL','Organisations-view','Organisations-create','Organisations-edit','Organisations-delete'],
                exact: true,
                path: '/admin/organisation',
                component: lazy(() => import('./views/admin/organisations'))
            },
            {
                permission:['ALL','Bi-Platforms-view','Bi-Platforms-create','Bi-Platforms-edit','Bi-Platforms-delete'],
                exact: true,
                path: '/admin/bi-platforms',
                component: lazy(() => import('./views/admin/bi-platforms'))
            },
            {
                permission:['ALL','Bi-Dashboards-view','Bi-Dashboards-create','Bi-Dashboards-edit','Bi-Dashboards-delete'],
                exact: true,
                path: '/admin/bi-dashboards',
                component: lazy(() => import('./views/admin/bi-dashboards'))
            },
            {
                permission:['ALL','View-dashboards'],
                exact: true,
                path: '/dashboards/view',
                component: lazy(() => import('./views/dashboards'))
            },
            {
                permission:['ALL','View-dashboards'],
                exact: true,
                path: '/data/vsp',
                component: lazy(() => import('./views/admin/uploads-components/vsp'))
            },
            {
                permission:['ALL','View-dashboards'],
                exact: true,
                path: '/data/pms',
                component: lazy(() => import('./views/admin/uploads-components/pms'))
            },
            {
                permission:['ALL','View-dashboards'],
                exact: true,
                path: '/data/finance',
                component: lazy(() => import('./views/admin/uploads-components/finance'))
            }
        ]

    }
];

export default routes;
