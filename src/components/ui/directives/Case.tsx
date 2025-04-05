import { ReactNode } from 'react'

type CaseProps = {
  when?: any
  default?: boolean
  children: ReactNode
}

const Case = ({ children }: CaseProps) => <>{children}</>

export default Case
