import { ReactNode, Fragment } from 'react'

type ForProps<T> = {
  each: T[]
  render: (item: T, index: number) => ReactNode
  keyExtractor?: (item: T, index: number) => React.Key
}

const For = <T,>({ each, render, keyExtractor }: ForProps<T>) => {
  return (
    <>
      {each.map((item, index) => (
        <Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {render(item, index)}
        </Fragment>
      ))}
    </>
  )
}

export default For
