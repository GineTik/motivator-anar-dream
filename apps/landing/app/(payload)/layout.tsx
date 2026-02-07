import React from 'react'

import './custom.scss'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
