<div id="page-wrapper">
  <div id="page">
    <?php if ($page['top']): ?>
      <?php print render($page['top']); ?>
    <?php endif; ?>
    <div id="header">
      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="logo">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
        </a>
      <?php endif; ?>
      <?php if ($page['header']): ?>
        <?php print render($page['header']); ?>
      <?php endif; ?>
    </div>

    <?php if ($page['navigation']): ?>
      <?php print render($page['navigation']); ?>
    <?php endif; ?>

    <?php print $messages; ?>

    <?php if ($tabs = render($tabs)): ?>
      <div class="tabs">
        <?php print $tabs; ?>
      </div>
    <?php endif; ?>

    <?php if ($page['highlighted']): ?>
      <?php print render($page['highlighted']); ?>
    <?php endif; ?>

    <?php if ($page['featured']): ?>
      <?php print render($page['featured']); ?>
    <?php endif; ?>

    <div id="main-wrapper">
      <div id="main">
        <div id="content" class="column">
          <a id="main-content"></a>
          <?php print render($title_prefix); ?>
          <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
          <?php print render($title_suffix); ?>

          <?php print render($page['help']); ?>

          <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
          <?php print render($page['content']); ?>
          <?php print $feed_icons; ?>
        </div>

        <?php if ($page['sidebar_first']): ?>
          <div id="sidebar-first">
            <?php print render($page['sidebar_first']); ?>
          </div>
        <?php endif; ?>

        <?php if ($page['sidebar_second']): ?>
          <div id="sidebar-second">
            <?php print render($page['sidebar_second']); ?>
          </div>
        <?php endif; ?>
      </div>
    </div>

    <?php if ($page['post_content']): ?>
      <?php print render($page['post_content']); ?>
    <?php endif; ?>

    <div id="footer">
      <?php if ($page['pre_footer']): ?>
        <?php print render($page['pre_footer']); ?>
      <?php endif; ?>
      <?php if ($page['footer']): ?>
        <?php print render($page['footer']); ?>
      <?php endif; ?>
      <?php if ($page['post_footer']): ?>
        <?php print render($page['post_footer']); ?>
      <?php endif; ?>
    </div>
  </div>
</div>
