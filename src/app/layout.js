import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.svg" />
        <title>Daily Report</title>
      </head>
      <body className="scroll-smooth" suppressHydrationWarning>
        <div>{children}</div>
      </body>
    </html>
  );
}
