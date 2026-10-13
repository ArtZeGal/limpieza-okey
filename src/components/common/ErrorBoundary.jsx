import React from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) {
      this.props.onReset()
    } else {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-white border border-rose-200 shadow-md text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900">
            Algo ocurrió al cargar esta sección
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hemos registrado el incidente. Puedes recargar o regresar al catálogo principal con un solo clic.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recargar sección</span>
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
