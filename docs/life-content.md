# Life content

`src/app/(site)/life/page.tsx` keeps the monthly editorial record. Months appear newest first; notes within each month retain their authored order.

## Monthly reflection

The optional `intro` field is a short personal introduction to the month. Leave it absent when there is nothing to add: no placeholder or empty heading is shown.

When there is something to share, it may describe what changed, what occupied your attention, or how the month felt. One or two genuine sentences are enough; there is no monthly quota.

## Personal notes

An ordinary note only needs `text`. `relatedLink` is optional, so a book, observation, or project put aside can be recorded without a separate page or category. Add only supplied, publishable personal content; do not infer experiences from project activity.

## Writing updates

Use `writingLink('hikayeler/story-slug')` for individual writing links. The registry supplies the current title and URL; an unknown path fails the build rather than publishing a broken link. Keep editorial note text independent from SEO descriptions.

Related writing updates can share one note with `text` and a `links` array of `writingLink(...)` values. An optional `relatedLink` remains inline with the text, for example the Arena series link. The other links appear beneath the note in their authored order.

For Arena, use `text: arenaSeries.title` when there is no separate monthly note. Show only story titles and links; individual stories do not need editorial descriptions. Keep unrelated notes outside the group. A personal reflection on the writing process can be added separately when there is something to share.

Month links use the existing `dateTime` value, for example `/life#2026-09`. Keep these identifiers stable.
