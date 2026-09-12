import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Badge } from './ui/badge'

const MAX_VISIBLE_TAGS = 5

type ExpandableTagsProps = {
  tags: string[]
  label: string
}

function ExpandableTags({ tags, label }: ExpandableTagsProps) {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = tags.length > MAX_VISIBLE_TAGS
  const visibleTags =
    expanded || !hasOverflow ? tags : tags.slice(0, MAX_VISIBLE_TAGS)

  return (
    <div className="flex flex-wrap gap-1">
      {visibleTags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}

      {hasOverflow && (
        <Badge variant="outline" className="cursor-pointer" asChild>
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={
              expanded
                ? `Ver menos tags de ${label}`
                : `Ver mais tags de ${label}`
            }
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? (
              <MinusIcon />
            ) : (
              <>
                {tags.length - visibleTags.length}
                <PlusIcon />
              </>
            )}
          </button>
        </Badge>
      )}
    </div>
  )
}

export { ExpandableTags }
