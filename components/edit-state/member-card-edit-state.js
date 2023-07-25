import { useState } from "react";
import RevokeAccess from "./revoke-access";
import EditBio from "./edit-bio";
import Error from "../error";

export default function MemberCardEditState({ setEditState, member }) {
  const [error, setError] = useState("");

  return (
    <div className="flex-auto">
      <h2 className="text-xl font-semibold tracking-tight leading-8 text-gray-900 dark:text-white">
        Edit
      </h2>

      {!!error ? <Error message={error} /> : ""}

      <EditBio
        setEditState={setEditState}
        member={member}
        setError={setError}
      />

      <RevokeAccess setError={setError} id={member.id} />
    </div>
  );
}
