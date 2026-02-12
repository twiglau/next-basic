'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    if(url) {
        router.refresh();
    }
  }, [pathname, searchParams])
 
  return null;
}