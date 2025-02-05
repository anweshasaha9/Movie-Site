<?php

namespace Drupal\user_info_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\user\Entity\User;

/**
 * Provides a 'User Info' Block.
 *
 * @Block(
 *   id = "user_info_block",
 *   admin_label = @Translation("User Info"),
 *   category = @Translation("Custom Blocks")
 * )
 */
class UserInfoBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $uid = \Drupal::currentUser()->id();
    $user = User::load($uid);
    if ($user) {
      $username = $user->getDisplayName();
      $created_time = $user->getCreatedTime();
      $formatted_date = \Drupal::service('date.formatter')->format($created_time, 'custom', 'd M Y');
      return [
        '#theme' => 'item_list',
        '#items' => [
          $this->t('Username: @username', ['@username' => $username]),
          $this->t('Account Created: @date', ['@date' => $formatted_date]),
        ],
        '#cache' => [
          'contexts' => ['user'],
        ],
      ];
    }
    return ['#markup' => $this->t('User not found.')];
  }

}
