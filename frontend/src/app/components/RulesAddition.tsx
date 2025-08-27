"use client"
import AddRuleForm from "@/app/components/AddRuleForm";
import {useState} from "react";
//import "../../config/logger"

const RulesAddition = () => {
    console.log("we are hereeerererere")
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState({});
    return (
        <>
            {!showForm && <button onClick={() => setShowForm(true)}>Add Rule</button>}

            {showForm && (
                <AddRuleForm setData={setData}/>
            )}
        </>
    );
};
export default RulesAddition;