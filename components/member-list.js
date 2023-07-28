import MemberCard from "./member-card";
import { useSession } from "next-auth/react";

export default function MemberList({ members }) {
  const { data: session } = useSession();

  if (!members || members.length === 0) return;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-20 mt-20 mx-auto max-w-2xl sm:grid-cols-2 lg:gap-x-10 lg:max-w-6xl xl:max-w-none 2xl:grid-cols-3"
    >
      {members.map((member) => {
        // Only show members who are visible in directory
        if (member.shownInDirectory)
          return (
            <MemberCard
              member={member}
              editable={
                member.email === session?.user.email || session?.user.admin
              }
              key={member.id}
            />
          );
      })}
    </ul>
  );
}
