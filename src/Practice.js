/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { MyTextInputField, SelectField, Checkbox, Button, FormField, } from 'evergreen-ui';
import { url, getMyClinics, automatic } from './url';
import { firstState, reasons } from './data';
import { Select } from 'evergreen-ui/commonjs/select';
import { SelectClinic, Wrapper, SubmitButton, DevInfo, Err } from './Fields';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AddVisitSchema } from './Validation';

const Practice = () => {
  // useEffect(() => {
  //   fetch(url+'receipt', {

  //   }).then()
  // })
  // const submit = () => {
  //   const formData = new FormData();
  //   const file = myRef.current.files[0]
  //   formData.append('myFile', file)
  //   console.log(18, file)
  //   fetch(url + 'receipt', {
  //     method: 'Post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: formData
  //   })
  // }
  AWS.config.update({
    region: 'us-west-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:fdc724d0-f174-4abb-8a86-af72f2686475"
    })
  });
  var s3 = new AWS.S3({
    params: { Bucket: 'pglreceipts' }
  });
  const submit = () => {
    const file = myRef.current.files[0]
    console.log(30, file)
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'pglreceipts',
        Key: 'secretekey',
        // Body: file,
        Body: JSON.stringify({ thing: 'thing' }),
        ACL: "public-read"
      }
    });
    console.log(39, upload)
    var promise = upload.promise();

    promise.then(
      function (data) {
        alert("Successfully uploaded photo.");
        // viewAlbum(albumName);
      },
      function (err) {
        console.log(48, err)
        // return alert("There was an error uploading your photo: ", err.message);
      }
    );
  }

  const myRef = React.createRef();
  return <>
    <input type="file" ref={myRef} />
    <button onClick={submit}>submit</button>
    {/* <img src={url + 'receipt'} alt='img' /> */}
    screenshot
    {/* <img src="https://pglreceipts.s3-us-west-1.amazonaws.com/Screen+Shot+2019-03-24+at+5.25.19+PM.png" alt='img' /> */}
  </>
}

export { Practice };