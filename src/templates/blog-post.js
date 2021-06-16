import React, { useState, useEffect } from 'react';
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const [defaultLangKey, setDefaultLangKey] = useState('es')

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (lang) {
      setDefaultLangKey(lang)
    }
  }, [])

  let prevDev = ""
  if (previous && (previous.frontmatter.langKey === defaultLangKey)) {
    prevDev = <Link to={previous.fields.slug} rel="prev">
      ← {previous.frontmatter.title}
    </Link>
  }

  let nextDev = ""
  if (next && (next.frontmatter.langKey === defaultLangKey)) {
    nextDev = <Link to={next.fields.slug} rel="next">
      {next.frontmatter.title} →
  </Link>
  }


  return (
    <Layout location={location} title={post.frontmatter.title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {prevDev}
          </li>
          <li>
            {nextDev}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description,
        langKey
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title,
        langKey
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title,
        langKey
      }
    }
  }
`
