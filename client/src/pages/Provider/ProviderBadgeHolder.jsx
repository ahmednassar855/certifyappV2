
// import ReactDataTable from '../../components/ReactDataTable';
import { useMemo } from 'react';
import { ReactTanStackTable} from '../../components';
import MOCK_DATA from "../../../MOCK_DATA.json";


const ProviderBadgeHolder = () => {
  const data = useMemo(() => MOCK_DATA, []);

  /**@type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    { header: "ID", accessorKey: "id", footer: "ID" },
    {header: "CandidateName",accessorKey: "candidateName",footer: "CandidateName"},
    {header: "TrainingCenter",accessorKey: "trainingCenter",footer: "TrainingCenter"},
    {header: "TrainingSubject",accessorKey: "trainingSubject",footer: "TrainingSubject"},
    { header: "IssueDate", accessorKey: "issueDate", footer: "IssueDate" },
    { header: "Country", accessorKey: "country", footer: "Country" },
    { header: "Action", accessorKey: "action", footer: "Action" },
  ];
  return (
    <div className="container">
      {/* <ReactDataTable/> */}
      <ReactTanStackTable data={data} columns={columns}/>
    </div>
  )
}

export default ProviderBadgeHolder