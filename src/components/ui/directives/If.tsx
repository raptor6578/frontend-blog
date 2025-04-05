import { ReactNode, Children, isValidElement, ReactElement } from 'react'

type ConditionProps = {
  condition: unknown
  children: ReactNode
}

export const If = ({ condition, children }: ConditionProps) => {
  let ifBlock: ReactNode = null
  let elseBlock: ReactNode = null

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    const element = child as ReactElement

    if (element.type === Else) {
      elseBlock = (element as ReactElement<{ children: ReactNode }>).props.children
    } else if (element.type === Then) {
      ifBlock = (element as ReactElement<{ children: ReactNode }>).props.children
    }
  })

  return condition ? <>{ifBlock}</> : <>{elseBlock}</>
}

export const Then = ({ children }: { children: ReactNode }) => <>{children}</>
export const Else = ({ children }: { children: ReactNode }) => <>{children}</>
