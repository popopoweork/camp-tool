import { useContext, useEffect } from "react";
import useMyEquipmentsContents, { UpdateMyEquipmentsContext } from "../../../utils/use-my-equipments-contents";
import Edit from "./Edit";
import './GoodList.css'
function GoodList() {
    const value = useContext(useMyEquipmentsContents);
    const updateMyEquipments = useContext(UpdateMyEquipmentsContext);
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
