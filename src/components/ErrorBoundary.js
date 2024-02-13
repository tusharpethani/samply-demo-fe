// ErrorBoundary component

import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
    state = {
        error: null,
        errorMessage: '',
    };

    static getDerivedStateFromError(error) {
        // Update state so next render shows fallback UI.
        return { error: error, errorMessage: error.toString() };
    }

    componentDidCatch(error, info) {
        // Log the error to an error reporting service
        console.log('Error', error);
        console.log('Info', info, info.componentStack);
    }

    render() {
        if (this.state.error) {
            // You can render any custom fallback UI
            console.log('errorMessage', this.state.errorMessage);
            return <p>Something broke</p>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    // eslint-disable-next-line react/require-default-props
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default ErrorBoundary;
