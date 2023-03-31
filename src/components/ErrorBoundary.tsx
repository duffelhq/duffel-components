import React from "react";
import { captureErrorInSentry } from "@lib/captureErrorInSentry";

export class ErrorBoundary extends React.Component<{
  children: React.ReactNode | React.ReactNode[];
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, context: Record<any, any>) {
    // You can also log the error to an error reporting service
    captureErrorInSentry(error, context);
  }

  render() {
    if (this.state.hasError) {
      return <NonIdealState>Failed to render</NonIdealState>;
    }

    return this.props.children;
  }
}

const NonIdealState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      boxShadow: "inset 0 0 0 1px red",
      padding: "16px",
      borderRadius: "4px",
    }}
  >
    {children}
  </div>
);
