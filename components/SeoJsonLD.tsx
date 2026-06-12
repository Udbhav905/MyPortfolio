'use client';

import React from 'react';

export default function SeoJsonLD() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Udbhav Prajapati Portfolio',
    url: 'https://udbhavprajapati.vercel.app/',
    description: 'Portfolio of Udbhav Prajapati, a Full‑Stack Web & Mobile Developer specializing in React, Next.js, Node.js, MongoDB, React Native, and Flutter.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://udbhavprajapati.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    author: {
      '@type': 'Person',
      name: 'Udbhav Prajapati',
      url: 'https://udbhavprajapati.vercel.app',
      sameAs: [
        'https://github.com/Udbhav905',
        'https://www.linkedin.com/in/udbhav-prajapati-485841332/'
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
