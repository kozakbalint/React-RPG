import React, { useContext } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { CharacterContext } from "../contexts/CharacterContext";

function CharacterCreationForm() {
  const { character, setCharacter } = useContext(CharacterContext);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Required.")
      .max(15, "Must be at most 15 characters."),
    age: yup
      .number()
      .required("Required.")
      .min(9, "Must be greater than or equal to 9.")
      .max(100, "Must be less than or equal to 100."),
  });

  return (
    <div className='text-center w-full'>
      <h1 className='mr-50 text-3xl font-bold'>Create a Character</h1>
      <Formik
        initialValues={{
          username: "",
          age: 18,
          race: "human",
          gender: "male",
          classes: "fighter",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          setCharacter(data);
          setSubmitting(false);
        }}>
        {({ values, isSubmitting, errors, touched }) => (
          <Form className='form'>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <label htmlFor='username' className='input-label'>
                Name:
              </label>
              <Field name='username' type='input' className='input-field' />
              {errors.username && touched.username ? (
                <div className='input-error'>{errors.username}</div>
              ) : null}
            </div>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <label htmlFor='age' className='input-label'>
                Age:
              </label>
              <Field name='age' type='number' className='input-field' />
              {errors.age && touched.age ? (
                <div className='input-error'>{errors.age}</div>
              ) : null}
            </div>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <label htmlFor='race' className='input-label'>
                Race:
              </label>
              <Field name='race' as='select' className='input-field'>
                <option value='human'>Human</option>
                <option value='gypsy'>Gypsy</option>
              </Field>
              {errors.race && touched.race ? (
                <div className='input-error'>{errors.race}</div>
              ) : null}
            </div>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <label htmlFor='gender' className='input-label'>
                Gender:
              </label>
              <Field name='gender' as='select' className='input-field'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Field>
              {errors.gender && touched.gender ? (
                <div className='input-error'>{errors.gender}</div>
              ) : null}
            </div>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <label htmlFor='classes' className='input-label'>
                Class:
              </label>
              <Field name='classes' as='select' className='input-field'>
                <option value='fighter'>Fighter</option>
                <option value='rogue'>Rogue</option>
                <option value='wizard'>Wizard</option>
              </Field>
              {errors.classes && touched.classes ? (
                <div className='input-error'>{errors.classes}</div>
              ) : null}
            </div>
            <div>
              <button className='button' disabled={isSubmitting} type='submit'>
                Create
              </button>
            </div>
            <pre>{JSON.stringify(character, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CharacterCreationForm;
