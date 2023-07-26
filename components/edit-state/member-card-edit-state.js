import { useState } from "react";
import RevokeAccess from "./revoke-access";
import Form from "./form";
import Error from "../flashes/error";

export default function MemberCardEditState({
  setEditState,
  setSuccess,
  member,
}) {
  const [error, setError] = useState("");

  return (
    <div className="flex-auto">
      <h2 className="text-xl font-semibold tracking-tight leading-8 text-brand-dark dark:text-brand-light">
        Edit
      </h2>

      {!!error ? <Error message={error} /> : ""}

      <Form
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />

      <RevokeAccess setError={setError} id={member.id} />
    </div>
  );
}
