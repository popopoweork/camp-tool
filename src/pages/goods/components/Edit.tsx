import {
  Fragment,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Equipment,
  EquipmentType,
  FormError,
  initEquipment,
} from "../../../utils/types";
import axios from "axios";
import './GoodList.css'
import { UpdateMyEquipmentsContext } from "../../../utils/use-my-equipments-contents";

function Edit({ equipment, add = false }: { equipment?: Equipment, add?: boolean }) {
  const [good, setGood] = useState<Equipment>(add ? initEquipment : equipment!);
  const [error, setError] = useState<FormError>({});
  const [startAdd, setStartAdd] = useState(false);
  const updateMyEquipments = useContext(UpdateMyEquipmentsContext);
  const onChange = (field: string, e: any) => {
    setGood({ ...good, [field]: e.target.value });
  };

  const onEdit = useCallback(
    (e: any) => {
      e.preventDefault();
      const validateResult = validate(good);
      setError(validateResult);
      if (!!Object.keys(validateResult).length) {
        return;
      }
      axios.patch(
        `https://api.github.com/repos/chinheki/pwa-test/issues/comments/${good.id}`,
        {
          body: JSON.stringify(good),
        },
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.REACT_APP_ISSUE_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      ).catch(e => {
        alert("save error");
        console.log(e);
      }).then(r => {
        setStartAdd(false)
        updateMyEquipments()
      });
    },
    [good, updateMyEquipments]
  );
  const onSave = useCallback(
    (e: any) => {
      e.preventDefault();
      const validateResult = validate(good);
      console.log(validateResult);
      setError(validateResult);
      if (!!Object.keys(validateResult).length) {
        return;
      }
      axios.post(
        "https://api.github.com/repos/chinheki/pwa-test/issues/1/comments",
        {
          body: JSON.stringify(good),
        },
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.REACT_APP_ISSUE_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      ).catch(e => {
        alert("save error");
        console.log(e);
      }).then(r => {
        setStartAdd(false)
        updateMyEquipments()
      });
    },
    [good, updateMyEquipments]
  );
  return (
    startAdd ?
      <div className="good-row  good-add-row">
        <div>{add ? '-' : good.id}</div>
        <div>
          <input
            value={good.name}
            onChange={(v) => onChange("name", v)}
          ></input>
          {error["name"] && (
            <span className="error">{error["name"]}</span>
          )}
        </div>
        <div>
          <select onChange={(v) => onChange("type", v)}>
            {Object.keys(EquipmentType).map((v) => (
              <option value={v} key={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            value={good.amount}
            onChange={(v) => onChange("amount", v)}
          ></input>
           {error["amount"] && (
            <span className="error">{error["amount"]}</span>
          )}
        </div>
        <div>
          <input
            value={good.memo}
            onChange={(v) => onChange("memo", v)}
          ></input>
        </div>
        <div>
          <button onClick={add ? onSave : onEdit}>Save</button>
        </div>
      </div>
      : add ? <div className="good-add-button">
        <button onClick={() => setStartAdd(true)}>Add</button>
      </div> :
        <div className="good-row">
          <div>
            {good.id}
          </div>
          <div>
            {good.name}
          </div>
          <div>
            <select onChange={(v) => { }} disabled value={good.type}>
              {Object.keys(EquipmentType).map((v) => (
                <option value={v} key={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            {good.amount}
          </div>
          <div>
            {good.memo}
          </div>
          <div>
            <button onClick={() => setStartAdd(true)}>Edit</button>
          </div>
        </div>
  );
}

export default Edit;

function validate(good: Equipment) {
  const error: FormError = {};
  if (!good.name.length) error["name"] = "name can not be empty";
  if (good.amount<1) error["amount"] = "amount should be greater than 0";
  return error;
}
