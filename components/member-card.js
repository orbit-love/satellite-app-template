import IdentityLink from "./identity-link";
import { useState } from "react";
import MemberCardEditState from "./member-card-edit-state";

export default function MemberCard({ member, editable }) {
  const [editState, setEditState] = useState(false);

  return (
    <li className="flex flex-col gap-6 xl:flex-row" key={member.id}>
      {/* We cannot use next/Image here since avatars are remotely loaded
          & we do not know the full list of sources for them */}
      <img
        className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
        src={member.avatar_url}
        alt=""
      />

      {editState ? (
        <MemberCardEditState setEditState={setEditState} member={member} />
      ) : (
        <div className="relative flex-auto">
          <h2 className="text-xl font-semibold tracking-tight leading-8 text-gray-900 dark:text-white">
            {member.name}
          </h2>

          <section className="flex flex-col my-2 space-y-2">
            {member.identities.map((identity) => (
              <IdentityLink identity={identity} key={identity.id} />
            ))}
          </section>

          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-200">
            {member.bio}
          </p>

          {editable ? (
            <button
              onClick={() => setEditState(true)}
              className="inline-block absolute top-0 right-0 py-1.5 px-2 text-gray-900 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline focus-visible:outline-offset-2"
            >
              Edit
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </li>
  );
}
