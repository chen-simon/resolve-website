// Site-wide settings. Swapping mailing list provider = edit `mailingList` only.

export const site = {
  name: 'Resolve',
  fullName: 'Resolve Interactive',
  url: 'https://resolveinteractive.ca',
  description: 'Resolve is a small independent game studio.',
  // TODO(open decision): confirm studio address.
  email: 'hello@resolveinteractive.ca',
};

export const mailingList = {
  // Provider form endpoint (MailerLite embedded form). Empty = mailto fallback.
  action: 'https://assets.mailerlite.com/jsonp/2704078/forms/201063697414620324/subscribe',
  method: 'post',
  // Name of the email input the provider expects.
  emailField: 'fields[email]',
  // Extra hidden fields the provider needs.
  hidden: { 'ml-submit': '1', anticsrf: 'true' } as Record<string, string>,
};
