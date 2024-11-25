import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Define metadata with proper types
export const metadata: { title: string; description: string } = {
  title: "Swipe Style",
  description: "Application for clothing.",
};

// Define the RootLayout component with the proper type for the 'children' prop
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
