import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { sortedBlogPost, coreContent } from '@/lib/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({
      params: { slug: [p.slug.split('.')[0]] },
      locale: p.slug.split('.')[p.slug.split('.').length - 1],
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params, locale }) => {
  const slug = (params.slug as string[]).join('.')
  const sortedPosts = sortedBlogPost(
    allBlogs.filter((p) => p.slug.split('.')[p.slug.split('.').length - 1] === locale)
  )
  const postIndex = sortedPosts.findIndex((p) => p.slug === `${slug}.${locale}`)
  // TODO: Refactor this extraction of coreContent
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === `${slug}.${locale}`)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === `${author}.${locale}`)
    return coreContent(authorResults)
  })

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  }
}

export default function Blog({
  post,
  authorDetails,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const router = useRouter()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  if (router.isFallback) {
    return (
      <div className="mt-8 mb-12">
        <SkeletonTheme
          baseColor={theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'}
          highlightColor={theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'}
        >
          <div>
            <div className="mb-12 h-9 md:h-12">
              <Skeleton width={'100%'} height={'100%'} />
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-3 h-[45px] w-[45px] sm:h-[70px] sm:w-[70px]">
                <Skeleton width={'100%'} height={'100%'} circle />
              </div>
              <div className="flex flex-col">
                <Skeleton width={'130px'} height={'20px'} />
                <Skeleton width={'130px'} height={'20px'} />
              </div>
            </div>
            <div className="mt-12 mb-6">
              <Skeleton width={'150px'} height={'32px'} />
            </div>
            <div className="mt-4">
              <Skeleton
                width={'100%'}
                containerClassName="flex flex-col gap-y"
                count={8}
                height={'28px'}
              />
            </div>
          </div>
        </SkeletonTheme>
      </div>
    )
  }

  return (
    <>
      {post && (
        <>
          {post.draft !== true ? (
            <MDXLayoutRenderer
              layout={post.layout || DEFAULT_LAYOUT}
              toc={post.toc}
              content={post}
              authorDetails={authorDetails}
              prev={prev}
              next={next}
            />
          ) : (
            <div className="my-24 text-center">
              <PageTitle>
                製作中{' '}
                <span role="img" aria-label="roadwork sign">
                  🚧
                </span>
              </PageTitle>
            </div>
          )}
        </>
      )}
    </>
  )
}
