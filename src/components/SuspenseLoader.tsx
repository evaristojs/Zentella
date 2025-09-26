import { Suspense } from 'react'
import ComponentLoader from './ComponentLoader'

interface SuspenseLoaderProps {
  children: React.ReactNode
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const SuspenseLoader = ({
  children,
  text,
  size = 'md',
  fullScreen = false
}: SuspenseLoaderProps) => {
  return (
    <Suspense
      fallback={
        <ComponentLoader
          text={text}
          size={size}
          fullScreen={fullScreen}
        />
      }
    >
      {children}
    </Suspense>
  )
}

export default SuspenseLoader