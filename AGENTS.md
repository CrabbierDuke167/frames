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

- The opening sequence is replayed through a browser event shared by the global navigation and homepage, keeping route concerns separate.
- The page background is a single document-wide atmosphere layer in the root layout; sections must not paint their own background blocks or full-width dividing lines. Why: per-section backgrounds created visible seams that broke the continuous gradient.
