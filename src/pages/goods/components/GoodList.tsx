import { useContext, useEffect } from "react";
import useMyEquipments, { UpdateMyEquipments } from "../../../utils/use-my-equipments";
import Edit from "./Edit";
import './GoodList.css'
function GoodList() {
    const value = useContext(useMyEquipments);
    const updateMyEquipments = useContext(UpdateMyEquipments);
    useEffect(() => {
        updateMyEquipments();
    }, [updateMyEquipments]);
    useEffect(() => {
        console.log(value)
    }, [value])
    return (

        <div className="good-list">
            <div className="good-header">

                <div>
                    id
                </div>
                <div>
                    name
                </div>
                <div>
                    type
                </div>
                <div>
                    amount
                </div>
                <div>
                    memo
                </div>
                <div>
                    Actions
                </div>
            </div>
            {value?.equipmentList.map((g) => (
                <Edit equipment={g} key={g.id}/>
            ))}
            <Edit add />
        </div>
    );
}

export default GoodList;
