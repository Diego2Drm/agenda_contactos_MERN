import { z } from 'zod';

// const FormSchemas = z.object({
//   name: z.string().min(1, { message: "El nombre es obligatorio." }),
//   email: z.string().email({ message: "El correo no tiene un formato válido." }),
//   phone_number: z.number({ invalid_type_error: "El teléfono debe de ser un número." }).int().positive().min(1, { message: "El teléfono es obligatorio" }),
//   genre: z.enum(["masculino", "femenino", "no_especificar"], {
//     errorMap: () => ({ message: "Debes seleccionar una opción válida de género." }),
//   }),
// })

const FormSchemas = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  email: z.string().email({ message: "El correo no tiene un formato válido." }),
  phone_number: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "El teléfono debe de ser un número." })
      .int()
      .positive()
      .min(1, { message: "El teléfono es obligatorio" })
  ),
  genre: z.enum(["masculino", "femenino", "no_especificar"]).refine(
    (val) => ["masculino", "femenino", "no_especificar"].includes(val),
    { message: "Debes seleccionar una opción válida de género." }
  ),
});


export function validateContact(object) {
  return FormSchemas.safeParse(object);
}

export function validatePartialContact(obj) {
  return FormSchemas.partial().safeParse(obj);
};