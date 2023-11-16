import axios from "axios";
import { useCallback, useState, useContext } from 'react';
import { MyEquipments, Equipment, User } from './types';
import useUser, { UseUserContent } from './use-user';


export default function UseMyEquipments() {
  console.log('init use')
  const [myEquipments, setMyEquipments] = useState<MyEquipments>();
const user=useContext(useUser)
  const updateMyEquipments = useCallback(async () => {
    console.log('real updateMyEquipments')
    axios
      .get("https://api.github.com/repos/popopoweork/camp-tool/issues/1/comments", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${user?.token??''}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .catch((e) => {
        alert("get good list error");
        console.log(e);
      })
      .then((r:any) => {
        console.log(r);
        const equipmentList:Equipment[]=[]
        r.data.map((comment:any)=>{
          if(!!comment.body?.length){
            const context=JSON.parse(comment.body) as Equipment;
            context.id=`${comment.id}`
            equipmentList.push(context)
          }
        })
        console.log(equipmentList)
        setMyEquipments({ equipmentList });
      });
  },[setMyEquipments,user])

  return {
    myEquipments,
    updateMyEquipments,
  };
}
