import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alienterprises.in', // Replace with your actual domain
      changeFrequency: 'daily',
      priority: 1, // Highest priority for the homepage
    },
    {
      url: 'https://alienterprises.in/aboutussection', // Assuming your About Us content is directly under this route
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://alienterprises.in/contactus',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://alienterprises.in/faqssection',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://alienterprises.in/productsection/products',
      changeFrequency: 'daily',
      priority: 0.9, // High priority for product listings
    },
    {
      url: 'https://alienterprises.in/terms',
      changeFrequency: 'yearly',
      priority: 0.3, // Lower priority for legal pages
    },
    {
      url: 'https://alienterprises.in/servicecentersection', // Assuming this is a dedicated page
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Add more URLs for other static pages or important sections if they have dedicated routes
  ];
}
