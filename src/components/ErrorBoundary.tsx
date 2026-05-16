"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
            <span className="material-symbols-outlined text-5xl text-primary mb-4">error_outline</span>
            <h2 className="font-headline-md text-headline-md mb-2">Something went wrong</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-6 bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 uppercase"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
