import Wrapper from "../../assets/wrappers/AwardingNewBadgeForm";
import { FormRow } from "../../components";
import SearchAutoComplete from "../../components/SearchAutoComplete";

const ProviderAwardingBadgeToAwardBadge = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="rightContent">
          <SearchAutoComplete />
          <FormRow
            name="grade"
            type="text"
            labelText="grade"
            withLabel={true}
            placeHolder="Grade"
          />
          <FormRow
            name="issueDate"
            type="date"
            labelText="issue date"
            withLabel={true}
          />
          <FormRow
            name="dueDate"
            type="date"
            labelText="due date"
            withLabel={true}
          />
          <FormRow
            name="approverExaminer"
            type="text"
            labelText="Approver / Examiner"
            withLabel={true}
            placeHolder="Registration number"
          />
          <span> Authority with power to approve</span>
          <FormRow
            name="internalCertifcate"
            type="text"
            labelText="Internal Certificate Nr. [if not applicable please write N/A]"
            withLabel={true}
            placeHolder="Internal Certificate Nr."
          />
        </div>

        <div className="leftContent">
          <textarea
            id="note"
            name="note"
            rows="10"
            cols="50"
            placeholder="if None, Write NONE"
          > </textarea>

          <button className="btn btn-block">Submit</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProviderAwardingBadgeToAwardBadge;
