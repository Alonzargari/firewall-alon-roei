"use client";
import Link from "next/link";

interface TabsBarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabsBar = ({ activeTab, setActiveTab }: TabsBarProps) => {
    return (
        <nav className="tabsbar">
            <Link href="/MainViewPage" onClick={() => setActiveTab("Firewall Rules")}>
                Firewall Rules
            </Link>
            <Link href="/MainViewPage" onClick={() => setActiveTab("Overview page")}>
                Overview
            </Link>
        </nav>
    );
};

export default TabsBar;
