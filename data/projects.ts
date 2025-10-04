import { Project, ArtistProjectCollection, Transaction, SalesRecord } from '../types.ts';

export const architectProjects: Project[] = [
  {
    title: 'Fisheries Management System',
    description: 'A comprehensive desktop application for managing authorizations and resources in the fisheries sector.',
    longDescription: 'Developed as part of an internship, this desktop application provides a robust solution for managing fishing authorizations. It features secure access control, data management for vessels and personnel, and reporting capabilities. The system was designed to streamline administrative processes and ensure regulatory compliance.',
    image: '1.jpg',
    tags: ['architect', 'desktop-app', 'data-management', 'backend'],
    simulationGif: '2.mp4'
  },
  {
    title: 'E-commerce Website',
    description: 'A full-featured e-commerce platform built with WordPress, including secure online payment integration.',
    longDescription: 'This project involved creating a complete online store from the ground up. Key responsibilities included customizing the WordPress theme, setting up product catalogs, and integrating a secure payment gateway. The result is a user-friendly and reliable platform for online sales.',
    image: '3.jpg',
    tags: ['architect', 'web-dev', 'wordpress', 'payment-gateway'],
    simulationGif: '4.mp4'
  },
  {
    title: 'Interactive Educational Platform',
    description: 'A web platform for students with exercises and a follow-up portal for parents.',
    longDescription: 'This platform provides an engaging learning environment for students through interactive exercises. A key feature is the dedicated parent portal, which allows for real-time tracking of a child\'s progress and performance. The UI/UX was carefully designed to be intuitive and encouraging for both students and parents.',
    image: '5.jpg',
    tags: ['architect', 'frontend', 'react', 'ui/ux', 'web-app'],
    simulationGif: '6.mp4'
  },
  {
    title: 'Gravity-Based Physics Game',
    description: 'A creative coding project involving a game built on physical simulations of gravity.',
    longDescription: 'This project was an exploration into game development and physics engines. The result is a simple but engaging game where players must navigate challenges based on gravity simulation. It demonstrates skills in logical problem-solving and implementing complex mechanics in a creative context.',
    image: '7.jpg',
    tags: ['architect', 'creative-coding', 'game-dev', 'simulation'],
    simulationGif: '8.mp4'
  },
  {
    title: 'Deepfake Detection App',
    description: "A Master's thesis project to detect deepfakes in videos using machine learning.",
    longDescription: 'This application was developed to detect manipulated video content (deepfakes). It integrates video preprocessing, face extraction, and a hybrid CNN–LSTM model to analyze temporal and spatial features. The project demonstrates how AI can be applied to combat digital misinformation and protect the authenticity of online media.',
    image: '9.jpg',
    tags: ['architect', 'ai', 'machine-learning', 'app-dev'],
    simulationGif: '10.mp4'
  },
  {
    title: 'Species Identification Tool',
    description: 'An application that uses step-by-step classification to identify species.',
    longDescription: 'This tool assists users in identifying species through a guided, step-by-step classification process. It leverages a structured database and a logical decision tree to narrow down possibilities based on user input. The project combines data organization with a user-friendly interface to make scientific identification more accessible.',
    image: '11.jpg',
    tags: ['architect', 'data-science', 'classification', 'app-dev'],
    simulationGif: '12.mp4'
  },
  {
    title: 'Personal Budget Tracker',
    description: 'An intuitive app for managing revenue and expenses, helping users maintain financial health.',
    longDescription: 'This application helps users take control of their finances by providing a simple way to track income and expenditures. It features categorization of expenses, visual reports to show spending habits, and the ability to set and monitor savings goals.',
    image: '15.jpg',
    tags: ['architect', 'finance', 'app-dev', 'management'],
    simulationGif: '16.mp4'
  },
  {
    title: 'Spectra QR Code Generator',
    description: 'A web app for creating customizable QR codes that can hold multiple links.',
    longDescription: 'Spectra QR allows users to generate dynamic and customizable QR codes. A standout feature is the ability to embed multiple links within a single QR code, directing users to different destinations. The platform also offers extensive customization options for QR code design to match brand aesthetics.',
    image: '31.jpg',
    tags: ['architect', 'web-app', 'frontend', 'tools'],
    simulationGif: '32.mp4'
  },
  {
    title: 'AI-Powered CV Maker',
    description: 'A professional CV builder with an integrated ATS checker and AI-powered assistance.',
    longDescription: 'This comprehensive CV Maker is designed to help users create professional, ATS-friendly resumes. It features an integrated ATS (Applicant Tracking System) checker to analyze and score resumes, providing actionable feedback. Additionally, it incorporates AI assistance to help users craft compelling content and optimize their CVs for specific job applications.',
    image: '33.jpg',
    tags: ['architect', 'ai', 'web-app', 'tools', 'ats'],
    simulationGif: '34.mp4'
  }
];

export const artistProjects: ArtistProjectCollection = {
  'Social Media Posts': [
    {
      title: 'EcoGrow Initiative Post',
      description: 'Clean, earthy design for an environmental campaign.',
      longDescription: 'This post, part of the EcoGrow campaign, uses natural textures and a clean layout to promote sustainability. The design is intended to be both calming and impactful, encouraging user engagement with the environmental initiative.',
      image: '17.jpg',
      tags: ['artist', 'social-media', 'graphic-design'],
    },
    {
      title: 'Synthwave Album Art Teaser',
      description: 'A retro-futuristic teaser for a music album.',
      longDescription: 'A promotional graphic for a synthwave album, capturing the genre\'s neon-drenched, 80s-inspired aesthetic. This piece was designed to build hype on social media channels ahead of the album\'s release.',
      image: '19.jpg',
      tags: ['artist', 'social-media', 'promo-art'],
    },
    {
      title: 'Tech Conference Announcement',
      description: 'Bold and futuristic announcement for a tech event.',
      longDescription: 'A social media announcement for a fictional tech conference. The design uses strong typography and abstract geometric shapes to create a sense of innovation and excitement.',
      image: '35.jpg',
      tags: ['artist', 'social-media', 'event-promo'],
    },
    {
      title: 'Minimalist Quote Graphic',
      description: 'Elegant typography-focused design for inspirational content.',
      longDescription: 'A simple yet elegant design focusing on typography to deliver an inspirational message. This style is highly shareable and effective for building a brand\'s voice on platforms like Instagram and Pinterest.',
      image: '36.jpg',
      tags: ['artist', 'social-media', 'typography'],
    },
    {
      title: 'Product Launch Carousel',
      description: 'A multi-image post showcasing a new product.',
      longDescription: 'This is the first slide of a carousel post designed for a product launch. The layout is clean, focusing attention on the product itself while maintaining brand consistency. The full carousel would detail features and benefits.',
      image: '37.jpg',
      tags: ['artist', 'social-media', 'product-launch'],
    },
    {
      title: 'Infographic Post',
      description: 'Data visualization for a social media feed.',
      longDescription: 'An infographic designed to present data in a visually digestible format for social media. This type of content is excellent for establishing authority and providing value to the audience, making complex information easy to understand and share.',
      image: '38.jpg',
      tags: ['artist', 'social-media', 'infographic', 'data-viz'],
    },
    {
      title: 'social media Post',
      description: 'Data visualization for a social media feed.',
      longDescription: 'An infographic designed to present data in a visually digestible format for social media. This type of content is excellent for establishing authority and providing value to the audience, making complex information easy to understand and share.',
      image: '39.jpg',
      tags: ['artist', 'social-media', 'infographic', 'data-viz'],
    },
    {
      title: 'Post',
      description: 'Data visualization for a social media feed.',
      longDescription: 'An infographic designed to present data in a visually digestible format for social media. This type of content is excellent for establishing authority and providing value to the audience, making complex information easy to understand and share.',
      image: '40.jpg',
      tags: ['artist', 'social-media', 'infographic', 'data-viz'],
    },
    {
      title: 'congrats Post',
      description: 'Data visualization for a social media feed.',
      longDescription: 'An infographic designed to present data in a visually digestible format for social media. This type of content is excellent for establishing authority and providing value to the audience, making complex information easy to understand and share.',
      image: '41.jpg',
      tags: ['artist', 'social-media', 'infographic', 'data-viz'],
    }
  ],
  'Logos & Branding': [
    {
      title: 'NexaTech Brand Identity',
      description: 'A complete branding package for a fictional tech startup, including logo, color palette, and typography.',
      longDescription: 'This project involved creating a full brand identity from scratch for "NexaTech," a futuristic technology company. The process included concept development, logo design, defining a primary and secondary color palette, and selecting typefaces to convey a modern and innovative brand image.',
      image: '42.jpg',
      tags: ['artist', 'branding', 'logo-design', 'graphic-design'],
      simulationGif: '22.mp4',
    },
    {
      title: 'Logo 1',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '43.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 2',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '44.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 4',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '46.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 5',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '47.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 6',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '48.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 7',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '49.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 8',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '50.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    },
    {
      title: 'Logo 9',
      description: 'A minimalist logo concept for a high-end coffee shop.',
      longDescription: 'The logo for "Quantum Coffee" was designed to be clean, modern, and memorable. It uses geometric shapes and a simple color scheme to appeal to a sophisticated audience. The project included the primary logo, variations for different applications, and a favicon.',
      image: '51.jpg',
      tags: ['artist', 'logo-design', 'branding', 'minimalist'],
      simulationGif: '24.mp4',
    }
  ],
  'UI & Interface Design': [
    {
      renderType: 'text-card',
      title: 'UI Philosophy: The Ghost in the Machine',
      description: '',
      longDescription: "Good design is invisible. It's the silent partner to functionality, the intuitive leap that bridges user intent with system action. My approach is to create interfaces that feel like an extension of thought—predictive, responsive, and unobtrusive. The goal is to build a seamless dialogue between human and machine, where the interface disappears, leaving only the experience.",
      image: '',
      tags: ['artist', 'ui/ux', 'philosophy'],
    },
    {
      renderType: 'text-card',
      title: 'Case Study: Athenaeum OS',
      description: '',
      longDescription: 'This portfolio is a living UI project. Codenamed "Athenaeum OS," it was designed to be a narrative experience, not just a gallery. It uses a persona-driven architecture (Architect, Artist, Analyst) to frame diverse skill sets within a cohesive world. The holographic grid, terminal-style typography, and subtle glitch effects are all intentional choices to create an immersive environment that is both a showcase and a statement of design capability.',
      image: '',
      tags: ['artist', 'ui/ux', 'concept-design', 'portfolio'],
    },
    {
      renderType: 'text-card',
      title: 'Retrospective: Architected Interfaces',
      description: '',
      longDescription: "The projects in the Architect Domain are functional systems with a core focus on user experience. This retrospective examines the interface design behind four key projects: the seamless, secure checkout flow of the E-commerce Platform; the engaging, dual-audience portal for the Interactive Educational Platform; the intuitive, AI-assisted workflow of the CV Maker; and the creative customization panel for the Spectra QR Code Generator. Each was a unique challenge in making complex logic accessible and efficient.",
      image: '',
      tags: ['artist', 'ui/ux', 'case-study', 'web-app'],
    }
  ]
};


// --- DATA FOR ANALYST DASHBOARDS ---

const generateSalesData = (): SalesRecord[] => {
    const data: SalesRecord[] = [];
    const today = new Date();
    const products = ['Quantum PC', 'Nova Tablet', 'Orion Smartphone', 'Cosmic Keyboard', 'Galaxy Mouse'];
    const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan'];
    const names = ['Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Ava', 'Elijah', 'Charlotte', 'William', 'Sophia'];
    let orderIdCounter = 1001;

    for (let i = 90; i > 0; i--) {
        const numSales = Math.floor(Math.random() * 5) + 1; // 1 to 5 sales per day
        for (let j = 0; j < numSales; j++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const product = products[Math.floor(Math.random() * products.length)];
            data.push({
                orderId: `ORD-${orderIdCounter++}`,
                date: date.toISOString().split('T')[0],
                customerName: names[Math.floor(Math.random() * names.length)],
                country: countries[Math.floor(Math.random() * countries.length)],
                product: product,
                amount: Math.floor(Math.random() * 1500) + 200, // 200 - 1700
            });
        }
    }
    return data;
};

const salesData = generateSalesData();


export const analystProjects: Project[] = [
  {
    title: 'Personal Finance Planner',
    description: 'An interactive dashboard to track income and expenses, categorize spending, and visualize your financial health in real-time.',
    longDescription: 'This interactive tool provides a clear and intuitive way to manage personal finances. Users can add new transactions and immediately see their financial overview update. The dashboard features a dynamic donut chart for visualizing spending habits by category, key performance indicators for income, expenses, and savings, and a detailed log of recent transactions. This project demonstrates skills in state management, user input handling, and creating clear, actionable data visualizations.',
    image: '',
    tags: ['analyst', 'dashboard', 'interactive', 'finance', 'data-entry'],
    projectType: 'personal-finance-dashboard',
    chartData: [], // Start with an empty array
  },
  {
    title: 'E-commerce Sales Dashboard',
    description: 'A comprehensive BI dashboard to analyze sales performance, with interactive filters, sorting, and multiple visualizations.',
    longDescription: 'This business intelligence dashboard offers a complete suite of tools for an' +
      'alyzing e-commerce sales data. It allows for dynamic filtering by date range and interactive sorting of sales records. Key visualizations include a sales trend line chart, a bar chart identifying top-selling products, and a geo-heatmap of sales by country. This project showcases the ability to process, aggregate, and present complex data in a multi-faceted and user-friendly interface, providing actionable insights for business strategy.',
    image: '',
    tags: ['analyst', 'bi', 'data-visualization', 'interactive', 'e-commerce'],
    projectType: 'sales-performance-dashboard',
    chartData: salesData,
  }
];