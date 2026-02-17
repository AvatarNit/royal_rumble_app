// components/EditableContent.tsx

import { getContent } from "../../actions/other";

export default async function EditableContent({
  contentKey,
}: {
  contentKey: string;
}) {
  const content = await getContent(contentKey);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
