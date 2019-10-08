import React, { Suspense, useCallback, ReactNode, lazy } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { App, Dashboard, Postings } from 'src/Organisms';
import { SignIn } from 'src/Molecules';

const useAppRender = (child: ReactNode) => useCallback(() => <Route>{(rotuerProps) => <App>{child}</App>}</Route>, [child]);

const useLazyAppRender = <T extends React.ComponentType<any>>(
  cb: () => Promise<{ default: T }>,
) => {
  const LazyComponent = lazy(cb) as any;

  return useAppRender(<LazyComponent />);
};

const Routes = () => {
  const renderSignIn = useAppRender(<SignIn />);

  const renderDashBoardLazy = useLazyAppRender(() => import('src/Organisms/Dashboard/Dashboard'));
  const renderListLazy = useLazyAppRender(() => import('src/Organisms/Postings/Postings'));

  return (
    // Wrap In Layout
    <Router>
      <Switch>
        <Route exact path="/" render={renderSignIn} />
        {/* <nav>
        <ul>
          <li>
            <Link to="/list">List</Link>
          </li>
          <li>
            <Link to="/portal/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav> */}

        <Suspense fallback={<Postings />}>
          <Route exact path="/list" render={renderListLazy}>
            {/* <Postings /> */}
            {/* <SigninScreen></SigninScreen> */}
          </Route>
          <Route exact path="/portal/dashboard" render={renderDashBoardLazy} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default Routes;
