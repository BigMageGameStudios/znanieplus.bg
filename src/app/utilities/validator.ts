import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value != g.get('passwordConfirm').value) {
        g.controls.passwordConfirm.setErrors({ 'passwordMismatch': true });
        return { 'passwordMismatch': true };
    }
    return null;
}
