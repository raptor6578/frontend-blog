import { ReactNode, Children, isValidElement } from 'react'

type SwitchProps = {
  value: any
  children: ReactNode
}

const Switch = ({ value, children }: SwitchProps) => {
  let matched: ReactNode = null

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (matched) return

    const { props } = child
    if (props.when === value || (props.default && matched === null)) {
      matched = child
    }
  })

  return <>{matched}</>
}

export default Switch
