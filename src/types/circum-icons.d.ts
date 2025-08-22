declare module '@klarr-agency/circum-icons-react' {
  import { FC, SVGProps } from 'react'
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string
  }
  
  export const Palette: FC<IconProps>
  export const Megaphone: FC<IconProps>
  export const Camera: FC<IconProps>
  export const Video: FC<IconProps>
  export const Building: FC<IconProps>
  export const Mail: FC<IconProps>
  export const Phone: FC<IconProps>
  export const Clock: FC<IconProps>
  export const Send: FC<IconProps>
  export const CheckCircle: FC<IconProps>
}