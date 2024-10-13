import * as React from 'react'

import { cn } from '@/lib/utils/cn'

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('w-full rounded-lg bg-card text-card-foreground shadow-sm sm:max-w-lg sm:border', className)}>{children}</div>
)

const CardHeader = ({ className, title, description }: { className?: string; title: string; description: string }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6 text-center', className)}>
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
)

const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('p-6 pt-0', className)}>{children}</div>
)

const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('flex items-center p-6 pt-0', className)}>{children}</div>
)

export { Card, CardHeader, CardFooter, CardContent }
