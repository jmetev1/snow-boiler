// import React from 'react';
// import { Button, Pane } from 'evergreen-ui';
// import './App.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { url } from './url';
// import { Authorized } from './Authorized';
// import { Err, MyTextInputField } from './Fields';
// import { LoginSchema } from './Validation';
// import logo from './image/pnglogo.png';
// const dev = process.env.NODE_ENV === 'development';

// export class Signup extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       ...options,
//       updateOptions: (key, { target: { checked } }) => {
//         localStorage[key] = checked;
//         this.setState(Object.fromEntries([[key, checked]]));
//       },
//     };
//   }

//   submit = values => {
//     values.newUser = true;
//     fetch(`${url}login`, {
//       method: 'POST',
//       body: JSON.stringify(values),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(r => r.json())
//       .then(region => this.setState({ region }));
//   };

//   render() {
//     return (
//       <OptionsContext.Provider value={this.state}>
//         <Pane
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           height="70vh"
//         >
//           <Pane width="90vw" border="default">
//             <img src={logo} height="47px" alt="pgl logo" />
//             <Formik onSubmit={this.submit} validationSchema={LoginSchema}>
//               {({ isSubmitting }) => (
//                 <Form>
//                   <ErrorMessage component={Err} name="username" />
//                   <Field
//                     as={MyTextInputField}
//                     name="username"
//                     label="Username"
//                   />
//                   <ErrorMessage component={Err} name="password" />
//                   <Field
//                     as={MyTextInputField}
//                     name="password"
//                     label="Password"
//                     type="password"
//                   />
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     children="Submit"
//                   />
//                   {this.state.region === false && 'login failed'}
//                 </Form>
//               )}
//             </Formik>
//           </Pane>
//         </Pane>
//       </OptionsContext.Provider>
//     );
//   }
// }
