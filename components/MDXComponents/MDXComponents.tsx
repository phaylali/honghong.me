/* eslint-disable react/display-name */
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ComponentMap } from 'mdx-bundler/client'
import { coreContent } from '@/lib/utils/contentlayer'
import Image from '../PostImage'
import CustomLink from '../Link'
import CustomIframe from '../Iframe'
import TOCInline from '../TOCInline'
import Pre from '../Pre'
import { BlogNewsletterForm } from '../NewsletterForm'
import type { Blog, Authors, OtherPage } from 'contentlayer/generated'

interface MDXLayout {
  layout: string
  content: Blog | Authors | OtherPage
  [key: string]: unknown
}

interface Wrapper {
  layout: string
  [key: string]: unknown
}

const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  CustomIframe,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return <MDXLayout layout={layout} content={mainContent} components={MDXComponents} {...rest} />
}
