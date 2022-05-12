import { FC } from 'react'
import { Link, useMatch, useResolvedPath, Path, PathMatch } from 'react-router-dom'

import { CustomLinkListProps } from '../../variables'
import './CustomLink.scss'

const CustomLink: FC<CustomLinkListProps> = ({ to, children }) => {
  const resolved: Path = useResolvedPath(to)
  const match: PathMatch<string> | null = useMatch({ path: resolved.pathname, end: true })
  // const remove = (e: React.MouseEvent, id: number) => {
  //   e.preventDefault()
  //   onRemove(id)
  // }

  return (
    <Link
      className={`link ${match && 'link_active'}`}
      // style={{ color: match ? 'white' : 'darkblue' }}
      to={to}
      // onClick={(e) => remove(e, id)}
    >
      {children}
    </Link>
  )
}

export default CustomLink
