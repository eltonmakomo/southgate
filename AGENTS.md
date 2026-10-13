<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All school copy lives in `src/content/site.ts`; pages render it through `$section.index.tsx` / `$section.$page.tsx` templates — add content there, not in routes.
- News articles are defined once as `schoolNews` in the content module and reused by the shared NewsFeed and section page templates so headlines, links and article content stay consistent.
- Section colours come from `.theme-*` classes in `src/styles.css` (`bg-sec`, `bg-sec-soft`, …) so components stay theme-agnostic.
- Public forms go through `src/lib/forms.functions.ts` (validation, honeypot, DB-backed rate limit) and write with the admin client to RLS-locked tables; never expose submissions to the browser.
