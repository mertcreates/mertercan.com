'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'making', href: '/making' },
  { label: 'writing', href: '/writing' },
  { label: 'Denemeler', href: '/denemeler', lang: 'tr', entryPath: '/writing/denemeler/' },
  { label: 'Arena', href: '/arena', lang: 'tr', entryPath: '/writing/hikayeler/arena-' },
  { label: 'life', href: '/life' },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const isSeriesWriting = navItems.some((item) => 'entryPath' in item && pathname.startsWith(item.entryPath));

  return (
    <div data-nosnippet=''>
      <nav className='siteHeader container-base' aria-label='Site' lang='en'>
        <Link
          href='/'
          className={`siteHeaderLink${pathname === '/' ? ' is-current' : ''}`}
          aria-current={pathname === '/' ? 'page' : undefined}
          translate='no'
        >
          mert ercan
        </Link>
        <div className='siteNav'>
          {navItems.map((item, index) => {
            const isSeriesEntry = 'entryPath' in item && pathname.startsWith(item.entryPath);
            const isCurrent =
              pathname === item.href ||
              isSeriesEntry ||
              (pathname.startsWith(`${item.href}/`) && (item.href !== '/writing' || !isSeriesWriting));

            return (
              <div key={item.href} className='flex items-center gap-2.5 sm:gap-4'>
                <Link
                  href={item.href}
                  lang={'lang' in item ? item.lang : undefined}
                  className={`siteHeaderLink${isCurrent ? ' is-current' : ''}`}
                  aria-current={isCurrent ? (pathname === item.href ? 'page' : 'location') : undefined}
                >
                  {item.label}
                </Link>
                {index < navItems.length - 1 && <span aria-hidden='true'>·</span>}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
