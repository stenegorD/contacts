import { useId } from "react";

type TagsListProps = {
    tags: TTag[]
}

type TTag = {
    id?: string;
    tag: string
}

export function TagsList({ tags }: TagsListProps) {
    const tagId = useId()
    return (
        <div className="flex items-center gap-1 flex-wrap gap-2">
            {tags && tags.map((t: TTag) => <span key={tagId + t.id} className="pl-3 pr-3 font-medium text-xs leading-5 bg-gray-400 rounded">{t.tag}</span>)}
        </div>
    )
}