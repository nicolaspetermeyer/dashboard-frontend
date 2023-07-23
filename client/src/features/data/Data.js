import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectDataById } from "./dataApiSlice";

const Data = ({ dataId }) => {
  const data = useSelector((state) => selectDataById(state, dataId));

  const navigate = useNavigate();

  if (data) {
    const handleEdit = () => navigate(`/data/${dataId}`);

    //const dataBox = data.box.toString().replaceAll(",", ", ");

    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.label_name}</td>
        <td>{data.tracking_id}</td>
        <td>{data.confidence}</td>
        <td>{data.Box}</td>
      </tr>
    );
  } else return null;
};

export default Data;
