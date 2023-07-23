import { useGetDataQuery } from "./dataApiSlice";
import Data from "./Data";

const DatasList = () => {
  const {
    data: datas,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDataQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className={"errmsg"}>{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = datas;

    const tableContent = ids?.length
      ? ids.map((dataId) => <Data key={dataId} dataId={dataId} />)
      : null;

    content = (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>label_name</th>
            <th>tracking_id</th>
            <th>confidence</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
};
export default DatasList;
