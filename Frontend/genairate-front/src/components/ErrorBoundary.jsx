import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text p-4">
          <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-2">An unexpected error occurred.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
