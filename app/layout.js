import "./globals.css";
import AuthProvider from "../components/SessionProvider";

export const metadata = {
  title: "memeVerse",
  description: "Created by Aryan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
