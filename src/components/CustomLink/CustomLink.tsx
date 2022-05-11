import { ReactNode } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = (props: { to: string; children: ReactNode }) => {
  const resolved = useResolvedPath(props.to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <div>
      <Link style={{ color: match ? 'white' : 'darkblue' }} to={props.to}>
        {props.children}
      </Link>
    </div>
  )
}

export default CustomLink
