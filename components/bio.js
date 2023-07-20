import { useState } from "react";

export default function Bio({ editable, bio }) {
  const [editState, setEditState] = useState(false);

  return (
    <>
      <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-200">
        {bio}
        {console.log(editable)}
      </p>
    </>
  );
}
