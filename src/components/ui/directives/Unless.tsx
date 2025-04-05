import { ReactNode } from 'react'

type UnlessProps = {
  condition: unknown
  children: ReactNode
}

const Unless = ({ condition, children }: UnlessProps) => {
  return !condition ? <>{children}</> : null
}

export default Unless