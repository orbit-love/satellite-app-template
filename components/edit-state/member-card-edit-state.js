import { useState } from "react";
import RevokeAccess from "./revoke-access";
import Form from "./form";
import Error from "../flashes/error";
import AdminForm from "./admin-form";

export default function MemberCardEditState({
  setEditState,
  setSuccess,
  member,
}) {
  const [error, setError] = useState("");

  return (
    <div className="flex-auto">
      <h2 className="text-brand-dark dark:text-brand-light text-xl font-semibold tracking-tight leading-8">
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

      <AdminForm
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />
    </div>
  );
}
