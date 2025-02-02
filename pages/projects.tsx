import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

export default function Projects() {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {t('projects:title')}
        </h1>
        <p className="mb-12 text-gray-600 dark:text-gray-400">{t('projects:description')}</p>
        <div className="flex flex-wrap">
          {projectsData[locale]?.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              href={d.href}
              imgSrc={d.imgSrc}
            />
          ))}
        </div>
      </div>
    </>
  )
}
