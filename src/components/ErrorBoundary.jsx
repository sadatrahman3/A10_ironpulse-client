import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <div className="text-6xl mb-4">💥</div>
          <h1 className="font-display text-2xl font-extrabold text-fog-200">Something went wrong</h1>
          <p className="mt-2 max-w-sm text-fog-400">An unexpected error occurred. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} className="mt-6 rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition">Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
