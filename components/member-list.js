import MemberCard from "./member-card";
import { useSession } from "next-auth/react";

export default function MemberList({ members, title }) {
  const { data: session } = useSession();

  if (!members || members.length === 0) return;

  return (
    <>
      <h2 className="text-brand-dark dark:text-brand-light mt-20 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>

      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-20 mt-6 mx-auto max-w-2xl sm:grid-cols-2 lg:gap-x-10 lg:max-w-6xl xl:max-w-none 2xl:grid-cols-3"
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
    </>
  );
}
