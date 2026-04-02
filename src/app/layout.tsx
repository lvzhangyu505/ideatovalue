import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ideatovalue',
  description: 'ideatovalue 共创项目平台，帮助有创意的想法被看见、被支持、被实现。',
  keywords: [
    'ideatovalue',
    '创意项目',
    '共创平台',
    '项目发起',
    '项目支持',
    '创意孵化',
    '价值共创'
  ],
  authors: [{ name: 'ideatovalue', url: 'https://www.ideatovalue.cn' }],
  generator: 'ideatovalue',
  openGraph: {
    title: 'ideatovalue',
    description: '让有创意的想法被看见、被支持、被实现。',
    url: 'https://www.ideatovalue.cn',
    siteName: 'ideatovalue',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
