"use client"
import {useState, useEffect} from "react";

const FirewallRulesView=()=> {
    const [openForm, setOpenForm] = useState<boolean>(false);

    return (
        <main style={{padding: "2rem"}}>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main view of your app.</p>
        </main>
    )
}

export default FirewallRulesView
