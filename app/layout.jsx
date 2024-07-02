import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
    title: "Promptopia",
    description: "Discover and share prompts"
};

const Rootlayout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NSQYYF9GDK"></Script>
                <Script id="google-analytics">
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-NSQYYF9GDK');`}
                </Script>
            </head>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                        <Analytics/>
                    </main>
                </Provider>
            </body>
        </html>
    );
};
export default Rootlayout;
