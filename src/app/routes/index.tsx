import React from 'react';
import { RouteProps, Link, Route, Switch, useLocation } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { hot } from 'react-hot-loader';
import Loadable, { LoadingComponentProps } from 'react-loadable';

const MyLoadingComponent = (props: LoadingComponentProps) => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

const _loadable = (loadFunc: any) =>
  Loadable({
    loader: loadFunc,
    loading: MyLoadingComponent,
    delay: 200
  });

export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: _loadable(() => import(/* webpackChunkName:"home" */ 'app/pages/Home'))
  },
  {
    path: '/login',
    exact: true,
    component: _loadable(() => import(/* webpackChunkName:"login" */ 'app/pages/Login'))
  },
  {
    path: '/about',
    exact: true,
    component: _loadable(() => import(/* webpackChunkName:"about" */ 'app/pages/About'))
  },
  {
    path: '/403',
    exact: true,
    component: _loadable(() => import(/* webpackChunkName:"403" */ 'app/components/NoPermission'))
  }
];

export const App = hot(module)(() => {
  const location = useLocation();
  const hideMenus = ['/403', '/login'];
  const isShowMenu = !hideMenus.includes(location.pathname);
  return (
    <div className="container">
      {isShowMenu && (
        <div className="menu">
          <Link to="/">首页</Link>
          <Link to="/about">关于我们</Link>
        </div>
      )}
      <Switch location={location}>
        {routes.map((val, key) => (
          <Route {...val} key={`route_${key}`} />
        ))}
      </Switch>
    </div>
  );
});
