import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/lib/metadata'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  variant?: 'dark' | 'light'
  className?: string
}

export function buildServiceBreadcrumbs(label: string, path: string): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Diensten', href: '/#diensten' },
    { label, href: path },
  ]
}

export default function Breadcrumbs({
  items,
  variant = 'dark',
  className = '',
}: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  }

  const linkClass =
    variant === 'dark'
      ? 'text-blue-200 transition-colors hover:text-white'
      : 'text-kms-navy transition-colors hover:text-kms-yellow'

  const currentClass =
    variant === 'dark' ? 'font-medium text-blue-100' : 'font-medium text-gray-700'

  const separatorClass = variant === 'dark' ? 'text-blue-300/60' : 'text-gray-400'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn(className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span aria-hidden="true" className={separatorClass}>
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" className={currentClass}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
