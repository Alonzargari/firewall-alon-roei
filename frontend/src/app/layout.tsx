import "./globals.css";
import Navbar from "@/app/components/Navbar";
import TabsBar from "@/app/components/TabsBar";
import TabsWrapper from "@/app/components/TabsWrapper"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <TabsWrapper>{children}</TabsWrapper>
            </body>
        </html>
    );
}