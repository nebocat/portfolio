import { Link } from 'react-router-dom'
import React from 'react'

export const TopNav: React.FC = () => (
  <section>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/error">Not Found</Link>
      </li>
    </ul>
  </section>
)
