import { TMedia } from '@/lib/schema'
import { MouseEventHandler } from 'react'

type ButtonProps = { onClick: MouseEventHandler<HTMLElement> | undefined; disabled: boolean; className?: string }
type RenderType = { render: (renderProps: ButtonProps) => React.JSX.Element }

type Props = RenderType | { render?: undefined; className?: string }
export type TToggleMutationProps = Props & { media: TMedia }
