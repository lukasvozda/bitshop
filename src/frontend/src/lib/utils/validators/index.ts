import type { Validator } from "svelte-forms";
import type { FieldValidation } from "svelte-forms/validators/validator";

interface CheckedObject {
    name: string,
}

export function mustBeInList(list : CheckedObject[]) : Validator {
    return (value: CheckedObject) : FieldValidation =>
        ({ valid: list.find((item : CheckedObject) => item.name.toLowerCase() === value.name.toLowerCase()) !== undefined, name: 'not_in_list' });

}

export function mustHaveSpecifiedName() : Validator {
    return (value: CheckedObject) : FieldValidation => {
        console.log("vmustHaveSpecifiedName: ", value);
        return ({valid: 'name' in value && !!value.name, name: 'must_be_specified'});
    }

}

