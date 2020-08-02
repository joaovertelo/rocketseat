import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRouter, Redirect } from 'react-router-dom'

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean,
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...props }) => {
    const { user } = useAuth();


    return (
        <ReactDOMRouter
            {...props}
            render={({ location }) => {
                return isPrivate === !!user ?
                    (<Component />)
                    :
                    (<Redirect to={{
                        pathname: isPrivate ? '/' : '/dashboard',
                        state: { from: location }
                    }} />);
            }
            }
        />
    );
}

export default Route;