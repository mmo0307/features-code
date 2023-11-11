# Error Boundary

create Error Boundary Component

```
import React from "react"

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error) {
    console.log("Error: ", error.message)
  }

  render() {
    if(this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
```