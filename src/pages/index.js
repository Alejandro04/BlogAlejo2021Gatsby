import React, { useState, useEffect } from 'react';
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [defaultLangKey, setDefaultLangKey] = useState('es')

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if(lang){
      setDefaultLangKey(lang)
    }
  }, [])
  
  const updateLang = (lang) => {
    setDefaultLangKey(lang)
    localStorage.setItem('lang', lang)
  }

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Blog" />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  const languageEnglish = <div className="languagesContainer">
    <div onClick={e => updateLang('en')}>English</div>
    <div style={{ marginLeft: '10px' }} onClick={e => updateLang('es')}>Spanish</div>
  </div>

  const languageSpanish = <div className="languagesContainer">
    <div onClick={e => updateLang('en')}>Inglés</div>
    <div style={{ marginLeft: '10px' }} onClick={e => updateLang('es')}>Español</div>
  </div>

  return (
    <Layout location={location} title={siteTitle}>
      {
        defaultLangKey === 'es' &&
        languageSpanish
      }
      {
        defaultLangKey === 'en' &&
        languageEnglish
      }
      <SEO title="Blog" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          if (post.frontmatter.langKey === defaultLangKey) {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          } else {
            return <div></div>
          }
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description,
          langKey
        }
      }
    }
  }
`
