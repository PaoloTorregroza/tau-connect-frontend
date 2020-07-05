export function requiredRule(message = 'This field is required'): (value: string | undefined) => boolean|string {
    return (value) => (!!value) || message;
}


// eslint-disable-next-line
export function emailRule(message = 'Must be an email'): (value: any) => boolean|string {
    return (value) => /.+@.+\..+/.test(value) || message;
}


