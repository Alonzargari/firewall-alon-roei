"use client"
import config from "../../config/env";
import { useState } from "react";
interface AddRuleFormProps {
    setData: (data: any) => void;
}
const AddRuleForm = ({setData}:AddRuleFormProps) => {

    const [selected, setSelected] = useState("ip");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${config.apiUrl}/${selected}`, {
                method: "POST",
            });

            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <label>Add rule: </label>

                <select
                    value={selected}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelected(e.target.value)
                    }
                >
                    <option value="ip">IP</option>
                    <option value="port">Port</option>
                    <option value="url">URL</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default AddRuleForm;
