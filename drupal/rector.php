<?php

declare(strict_types=1);

use DrupalFinder\DrupalFinderComposerRuntime;
use DrupalRector\Set\Drupal10SetList;
use DrupalRector\Set\Drupal11SetList;
use Rector\Config\RectorConfig;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->sets([
        Drupal10SetList::DRUPAL_10,
        Drupal11SetList::DRUPAL_11,
    ]);

    $drupalRoot = (new DrupalFinderComposerRuntime())->getDrupalRoot();
    $rectorConfig->autoloadPaths([
        $drupalRoot . '/core',
        $drupalRoot . '/modules',
    ]);

    $rectorConfig->paths([
        __DIR__ . '/scripts',
        __DIR__ . '/web/modules/custom',
        __DIR__ . '/docker/health.php',
        __DIR__ . '/web/sites/default/settings.cloudrun.php',
        __DIR__ . '/web/sites/default/settings.meridian.php',
    ]);

    $rectorConfig->fileExtensions(['php', 'module', 'theme', 'install', 'profile', 'inc', 'engine']);
    $rectorConfig->importNames(true, false);
    $rectorConfig->importShortClasses(false);
};
