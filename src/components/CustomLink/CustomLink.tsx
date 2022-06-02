import { Link, useMatch, useResolvedPath, Path, PathMatch } from 'react-router-dom'

import { CustomLinkListProps } from '../../types/variables'
import './CustomLink.scss'

const CustomLink: React.FC<CustomLinkListProps> = ({ to, children }) => {
  const resolved: Path = useResolvedPath(to)
  const match: PathMatch<string> | null = useMatch({ path: resolved.pathname, end: true })

  return (
    <Link
      className={`link ${match && 'link_active'}`}
      to={to}
    >
      {children}
    </Link>
  )
}

export default CustomLink
