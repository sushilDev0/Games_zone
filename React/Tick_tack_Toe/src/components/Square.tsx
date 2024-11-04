import { FC } from 'react'

interface SquareProps {
  onClick: ()=> void;
}

const Square: FC<SquareProps> = ({onClick}) => {
  return <div>Square</div>
}

export default Square