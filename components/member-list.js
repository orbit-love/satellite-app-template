export default function MemberList({ members }) {
  if (!members || members.length === 0) return;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-20 mt-6 mx-auto max-w-2xl sm:grid-cols-2 lg:gap-x-10 lg:max-w-6xl xl:max-w-none 2xl:grid-cols-3"
    >
      {members.map((member) => (
        <li
          className="text-brand-dark-highlight dark:text-brand-light-highlight mt-6 text-xl leading-8"
          key={member.id}
        >
          {member.email}
        </li>
      ))}
    </ul>
  );
}
