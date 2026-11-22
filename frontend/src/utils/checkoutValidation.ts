export type PaymentMethod = 'online' | 'cod';

export type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment: PaymentMethod;
};

export type FieldName = Exclude<keyof FormValues, 'payment'>;
export type FormErrors = Partial<Record<FieldName, string>>;

/** Order in which fields appear on the page, used to focus the first problem */
export const FIELD_ORDER: FieldName[] = [
  'name',
  'email',
  'phone',
  'address',
  'city',
  'state',
  'pincode',
];

export const EMPTY_VALUES: FormValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  payment: 'online',
};

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

/** Returns an error message for one field, or undefined when it is fine */
export function validateField(field: FieldName, values: FormValues): string | undefined {
  const value = values[field].trim();

  switch (field) {
    case 'name':
      return value ? undefined : 'Enter your full name.';

    case 'email':
      if (!value) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : 'Enter a valid email address, like name@example.com.';

    case 'phone': {
      if (!value) return 'Enter your mobile number.';
      // Allow spaces, dashes and a +91 or 0 prefix
      const digits = value.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
      return /^[6-9]\d{9}$/.test(digits)
        ? undefined
        : 'Enter a 10-digit mobile number, like 98765 43210.';
    }

    case 'address':
      return value ? undefined : 'Enter your house number and street.';

    case 'city':
      return value ? undefined : 'Enter your city or town.';

    case 'state':
      return value ? undefined : 'Choose your state.';

    case 'pincode':
      if (!value) return 'Enter your PIN code.';
      return /^[1-9]\d{5}$/.test(value) ? undefined : 'Enter a 6-digit PIN code, like 400001.';
  }
}

export function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of FIELD_ORDER) {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  }
  return errors;
}
