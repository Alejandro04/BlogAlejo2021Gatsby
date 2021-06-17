import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div>
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          src="../images/profile-pic.jpg"
          width={100}
          height={100}
          quality={95}
          alt="Alejandro Roa"
        />
        <p>Software Engineer</p>
      </div>
    )
  } else {
    header = (
      <div className="title-internal-page">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="new-header-section">
        <div className="new-header-title">
          <div>{header}</div>
        </div>
      </div>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
        {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
