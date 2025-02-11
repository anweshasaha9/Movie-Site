<?php

namespace Drupal\custom_form\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller for displaying the Thank You page.
 */
class ThankYouController extends ControllerBase {

  /**
   * Returns the thank you message.
   */
  public function content() {
    // Retrieve submitted data from session
    $session = \Drupal::service('session');
    $data = $session->get('submitted_data');

    if ($data) {
      $full_name = $data['full_name'];
      $contact_method = $data['contact_method'] === 'phone' ? 'Phone Number' : 'Email';
      $contact_value = $data['contact_value'];

      $message = $this->t('Thank you @name, for submitting your contact details :- <br> @method: @value.', [
        '@name' => $full_name,
        '@method' => $contact_method,
        '@value' => $contact_value,
      ]);
    } else {
      $message = $this->t('No data submitted.');
    }

    return [
      '#markup' => '<p>' . $message . '</p>',
    ];
  }
}
