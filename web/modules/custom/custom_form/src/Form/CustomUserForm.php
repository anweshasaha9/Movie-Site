<?php

namespace Drupal\custom_form\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Implements a custom user form.
 */
class CustomUserForm extends FormBase {

  /**
   * Returns the unique ID of the form.
   */
  public function getFormId() {
    return 'custom_user_form';
  }

  /**
   * Builds the form.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Full Name field
    $form['full_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Full Name'),
      '#required' => TRUE,
    ];

    // Choose Contact Method (Phone or Email)
    $form['contact_method'] = [
      '#type' => 'radios',
      '#title' => $this->t('Preferred Contact Method'),
      '#options' => [
        'phone' => $this->t('Phone Number'),
        'email' => $this->t('Email ID'),
      ],
      '#default_value' => 'phone',
      '#ajax' => [
        'callback' => '::updateContactFields',
        'wrapper' => 'contact-fields-wrapper',
        'event' => 'change',
      ],
    ];

    // Wrapper for AJAX updates
    $form['contact_fields'] = [
      '#type' => 'container',
      '#attributes' => ['id' => 'contact-fields-wrapper'],
    ];

    // Show Phone Number field if 'phone' is selected
    if ($form_state->getValue('contact_method', 'phone') === 'phone') {
      $form['contact_fields']['phone_number'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Phone Number'),
        '#required' => TRUE,
        '#description' => $this->t('Enter a valid 10-digit Indian phone number.'),
      ];
    }
    // Show Email ID field if 'email' is selected
    else {
      $form['contact_fields']['email'] = [
        '#type' => 'email',
        '#title' => $this->t('Email Address'),
        '#required' => TRUE,
        '#description' => $this->t('Only @digitalpolygon.com emails are allowed.'),
      ];
    }

    // Gender
    $form['gender'] = [
      '#type' => 'radios',
      '#title' => $this->t('Select Gender'),
      '#options' => [
        'male' => $this->t('Male'),
        'female' => $this->t('Female'),
        'other' => $this->t('Other'),
      ],
      '#required' => TRUE,
    ];

    // Submit Button
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * AJAX callback to update contact fields dynamically.
   */
  public function updateContactFields(array &$form, FormStateInterface $form_state) {
    return $form['contact_fields'];
  }

  /**
   * Form validation.
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $contact_method = $form_state->getValue('contact_method');

    if ($contact_method === 'phone') {
      $phone = $form_state->getValue('phone_number');
      if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
        $form_state->setErrorByName('phone_number', $this->t('Invalid phone number. It must be a 10-digit Indian number starting with 6-9.'));
      }
    } else {
      $email = $form_state->getValue('email');
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $form_state->setErrorByName('email', $this->t('Invalid email format.'));
      }
      if (!str_ends_with($email, '@digitalpolygon.com')) {
        $form_state->setErrorByName('email', $this->t('Only @digitalpolygon.com emails are allowed.'));
      }
    }
  }

  /**
   * Form submission handler.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $full_name = $form_state->getValue('full_name');
    $contact_method = $form_state->getValue('contact_method');
    $contact_value = $contact_method === 'phone' ? $form_state->getValue('phone_number') : $form_state->getValue('email');

    // Store data in session to pass to Thank You page
    \Drupal::service('session')->set('submitted_data', [
      'full_name' => $full_name,
      'contact_method' => $contact_method,
      'contact_value' => $contact_value,
    ]);

    // Redirect to the Thank You page
    $form_state->setRedirect('custom_form.thank_you');
  }
}
