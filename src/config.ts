// Site-wide settings. Swapping mailing list provider = edit `mailingList` only.

export const site = {
  name: 'Resolve',
  url: 'https://resolveinteractive.ca',
  description: 'Resolve is a small independent game studio.',
  // TODO(open decision): confirm studio address.
  email: 'hello@resolveinteractive.ca',
};

export const mailingList = {
  // Provider form endpoint (e.g. Buttondown / Kit). Empty = mailto fallback.
  action: '',
  method: 'post',
  // Name of the email input the provider expects.
  emailField: 'email',
  // Extra hidden fields the provider needs, e.g. { tag: 'star-stations' }.
  hidden: {} as Record<string, string>,
};
