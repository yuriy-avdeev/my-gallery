import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = ({ children, to }) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <div>
      <Link style={{ color: match ? 'white' : 'darkblue' }} to={to}>
        {children}
      </Link>
    </div>
  )
}

export default CustomLink
