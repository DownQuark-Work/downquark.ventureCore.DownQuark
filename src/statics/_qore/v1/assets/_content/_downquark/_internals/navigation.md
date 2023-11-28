<!-- TODO: Make these tables dynamic -->
<style>
  table.table-navigation {
    display:none;
    & a{
        transition: all 0.25s ease-out;
        &::after {
        content: '➚';
        position:relative;
        left:.125rem;
        top:0;
      }
      &:hover::after {
        left:.25rem;
        top:-.125rem;
      }
    }
    & tbody{ width:100% }
    & td { --downquark-color-text-interactive: var(--downquark-color-text-accent); }
    & mark{
      &::after{border-block-start-width:2.85ch}
      &::before{border-block-end-width:2.85ch}
    }
  }
  .table-selected-default .table-default { display:table; }
  .table-selected-project-foss .table-project-foss { display:table; }
</style>
<table class="[ table-navigation table-default ]">
  <tbody>
    <tr><td><strong><mark>downquark</mark><strong></td>
      <td><a href="/?about">about</a></td>
      <td><a href="/?contact">contact</a></td>
      <td><a href="/?about_mission-values">statements</a></td>
    </tr>
    <tr><td><strong><mark>projects</mark></strong></td>
      <td><a href="/?projects_stealth">stealth</a></td>
      <td><a href="/?projects_foss">foss</a></td>
      <td><a href="/?projects_submodules">submodules</a></td>
    </tr>
    <tr><td><strong><mark>internals</mark></strong></td>
      <td colspan="2" align="center"><a href="/?projects_perpetual/design-system"><b>design system</b></a></td>
      <td><a href="/?about_tech-decisions">decisions</a></td>
    </tr>
  <tbody>
</table>

<table class="[ table-navigation table-project-foss ]">
  <tbody>
    <tr><td><strong><mark>active</mark><strong></td>
      <td><a href="/?projects_active_foss_gui-tui">(G|T)UI</a></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr><td><strong><mark>queued</mark></strong></td>
      <td><a href="/?projects_queued_foss_mock-my-db">mock my db</a></td>
      <td><a href="/?projects_queued_foss_qanban">qanban</a></td>
      <td>&nbsp;</td>
    </tr>
  <tbody>
</table>
