import { twMerge } from 'tailwind-merge'

interface TitleProps {
  className?: string
}

export const Title = ({ className = '' }: TitleProps) => (
  <h1 className={twMerge('font-extrabold text-3xl text-center mb-4', className)}>
    📸{' '}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-700">Layout Comparison</span>
  </h1>
)
