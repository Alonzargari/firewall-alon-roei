import RulesAddition from "@/app/components/RulesAddition";

interface MainViewProps {
    activeTab: string;
}

const MainView=({ activeTab }: MainViewProps)=> {
    console.log(activeTab);
    return (
        <div>
            {activeTab === "Firewall Rules" &&
                <>
                    <RulesAddition/>
                </>
            }
            {activeTab === "Overview page" && <div>טאב תצוגה כללית</div>}
        </div>
    );
}
export default MainView;