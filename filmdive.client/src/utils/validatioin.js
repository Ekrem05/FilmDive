export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}
export function containsNumber(value) {
  const regex = /\d/;
  return regex.test(value);
}
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

export const passwordValidations = [
  "At least one number",
  "Must be between 5 and 20 characters",
];
