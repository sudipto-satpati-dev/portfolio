import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudipto Satpati — Full-Stack Software Engineer & Open-Source Developer",
  description:
    "Personal portfolio & open-source platform of Sudipto Satpati. Highlighting enterprise supply chain systems, real-time sync platforms, serverless backend migrations, and npm developer tooling.",
  keywords: [
    "Sudipto Satpati",
    "Full-Stack Engineer",
    "Software Developer Portfolio",
    "Java Spring Boot",
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
    "AWS Serverless",
    "Open Source Developer",
  ],
  authors: [{ name: "Sudipto Satpati" }],
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "Sudipto Satpati — Full-Stack Software Engineer",
    description:
      "Enterprise web systems, real-time collaboration platforms, serverless backend architectures, and open-source packages.",
    url: "https://sudipto-satpati.vercel.app",
    siteName: "Sudipto Satpati Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-text-primary antialiased selection:bg-accent-primary selection:text-background">
        {children}
      </body>
    </html>
  );
}
