import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"


@ValidatorConstraint({
    name:'configpassword',
    async: true
})

export class PasswordConstraint implements ValidatorConstraintInterface{
    validate(password: string, args: ValidationArguments) {
        if( password !== (args.object as any)[args.constraints[0]]){
            return false
        }
        return true
    }

    defaultMessage(args?: ValidationArguments):string {
        return 'Las contraseñas no coinciden'
}
}