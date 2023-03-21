import React, { Component, ReactNode } from 'react';
import { getAppEnv } from './getAppEnv';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the error in development or log in production
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (getAppEnv() === 'production') {
      // Log the error to an error reporting service in production
      console.error('Uncaught error:', error, errorInfo);
    }
  }


  render() {
    if (this.state.hasError) {
      if (getAppEnv() === 'development') {
        // Display the error message on screen in development mode
        return <div>An error occurred: {this.state.error?.message}</div>;
      } else {
        // In production, you might want to render a generic error message
        return <div>Something went wrong</div>;
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
