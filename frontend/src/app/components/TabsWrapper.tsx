"use client";
import { useState } from "react";
import TabsBar from "./TabsBar";

export default function TabsWrapper({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState("Firewall Rules");

    return (
        <>
            <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
            {children}
        </>
    );
}