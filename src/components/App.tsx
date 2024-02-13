import { useState } from "react";
import { BalanceButton } from "./BalanceButton";
import { BalanceChart } from "./BalanceChart";
import { Modal } from "./Modal";
import { Tab, TabGroup } from "./Tab";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";

export const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useState(0);

    return (
        <div>
            <Modal open={showModal}>
                {showModal ? <TransactionForm onSubmit={() => setShowModal(false)} /> : null}
            </Modal>

            <div className="bg-white">
                <div className="container flex justify-between mx-auto py-4">
                    <BalanceButton />
                    <button onClick={() => setShowModal(true)}>Create</button>
                </div>
            </div>

            <div className="container mx-auto py-4">
                <div className="flex mb-4 justify-between items-center">
                    <TabGroup>
                        <Tab isActive={tab === 0} onClick={() => setTab(0)} title="Chart" />
                        <Tab isActive={tab === 1} onClick={() => setTab(1)} title="Transactions" />
                        {/* <Tab isActive={tab === 2} onClick={() => setTab(2)} title="Data" /> */}
                    </TabGroup>

                    {/* <select className="input input-bordered">
                        <option value="">Period: 3 months</option>
                    </select> */}
                </div>

                {tab === 0 ? <BalanceChart /> : null}
                {tab === 1 ? <TransactionList /> : null}
            </div>
        </div>
    );
};
