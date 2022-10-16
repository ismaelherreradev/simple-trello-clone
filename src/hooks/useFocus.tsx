import { useRef, useEffect } from 'react'

export function useFocus() {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}
