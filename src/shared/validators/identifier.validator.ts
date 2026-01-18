import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';
import { SendOtpRequest } from 'src/modules/auth/dto';
  
@ValidatorConstraint({name: "IdentifierValidator", async: false})
export class IdentifierValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const object = args.object as SendOtpRequest;
    
    if (object.type === 'email') {
      return (
        typeof value === 'string' &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      );
    }
    
    if (object.type === 'phone') {
      return typeof value === 'string' && /^\+380\d{9}$/.test(value);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const object = args.object as SendOtpRequest;

    if (object.type === 'email') return 'Identifier must be a valid email';
    if (object.type === 'phone')
      return 'Identifier must be a valid phone number';

    return 'Identifier is not valid';
  }
}
