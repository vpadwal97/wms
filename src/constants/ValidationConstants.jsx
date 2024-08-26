export const CHECK_WHITE_SPACE_AT_END = /\s$/;
export const CHECK_WHITE_SPACE_AT_START = /^\s/;
export const CHECK_WHITE_SPACE_IN_STRING = /\s/;
export const CHECK_AT_LEAST_ONE_VALUE = /^\S+/;
export const CHECK_ONLY_ALPHABET = /^[a-zA-Z0-9]*$/; //lowercase,uppercase alphabets
export const CHECK_NUMBER_FIELD = /^[0-9]*$/;
export const MOBILE_NUMBER_VALIDATION = /^\d{10}$/; // /^\d{10}$/;
export const onlyDigit = /^\d+$/; // validation for only digit
export const EMAIL_VALIDATION =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const ZIP_CODE_VALIDATION = /^\d{6}$/;
export const BULK_UPLOAD_VALIDATION_MESSAGE = "Please Choose file to upload.";
export const DIGIT_OR_DECIMAL_VALUE_VALIDATION = /^\d*(\.\d+)?$/;
export const CODE_VALIDATION = /^[a-zA-Z0-9&]+$/;
export const AVOID_SPECIAL_CHARACTERS = !/^[a-zA-Z0-9]+$/; //To Avoid Special Characters
export const URL_VALIDATION = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
export const COUNTRY_PHONECODE = /^\+[0-9]*$/;
export const DATE_VALIDATION = /^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[012])[-\/]\d{4}$/
// normal text field validation
// 1. Does not allowed Whitespace at start and end
// 2. check isMandatory
// 3. check only alphabets (numbers and special characters not allowed)

export const onlyAlphanumericValidation = (
  value,
  textFieldName,
  errorField,
  isMandatory
) => {
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${textFieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${textFieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
      if (CHECK_ONLY_ALPHABET.test(value)) {
        return { isValid: true };
      }
      return {
        isValid: false,
        message: `In ${textFieldName} only alphanumeric are allowed.`,
        messageTwo: "Only alphanumeric are allowed.",
        errorField: errorField,
      };
    } else {
      return {
        isValid: false,
        message: `${textFieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  } else {
    if (CHECK_ONLY_ALPHABET.test(value)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      message: `In ${textFieldName} only alphabets are allowed.`,
      messageTwo: "Only alphanumeric are allowed.",
      errorField: errorField,
    };
  }
};

// 1. Does not allowed Whitespace at start
// 2. Does not allowed Whitespace at end
// 3. Does not allowed Whitespace in between
// 4. check isMandatory
// 5. Alpha-Numeric and "&" character allowed.

export const codeValidation = (
  value,
  codeFieldName,
  errorField,
  isMandatory
) => {
  if (!value && isMandatory) {
    return {
      isValid: false,
      message: `${codeFieldName} is Mandatory`,
      messageTwo: "This field is required. ",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${codeFieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${codeFieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (!CHECK_WHITE_SPACE_IN_STRING.test(value)) {
    if (isMandatory) {
      if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
        // if(CODE_VALIDATION.test(value)){
        return { isValid: true };
        // }
        // return {
        //     isValid: false,
        //     message: `${codeFieldName} contain only Alphanumeric Characters.`,
        //     messageTwo: 'Enter only Alphanumeric Characters.',
        //     errorField: errorField
        // }
      } else {
        return {
          isValid: false,
          message: `${codeFieldName} is Mandatory`,
          messageTwo: "This field is required. ",
          errorField: errorField,
        };
      }
    } else {
      return { isValid: true };
    }
  } else {
    return {
      isValid: false,
      message: ` Whitesspace is not allowed in ${codeFieldName} `,
      messageTwo: "Whitespace is not allowed.",
      errorField: errorField,
    };
  }
};

//EMAIL validation
export const emailValidation = (
  emailId,
  labelName,
  errorField,
  isMandatory
) => {
  if (CHECK_WHITE_SPACE_AT_START.test(emailId)) {
    return {
      isValid: false,
      message: `In ${labelName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(emailId)) {
    return {
      isValid: false,
      message: `In ${labelName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(emailId)) {
      if (EMAIL_VALIDATION.test(emailId)) {
        return {
          isValid: true,
        };
      } else {
        return {
          isValid: false,
          message: `In ${labelName} Enter Valid Email Id.`,
          messageTwo: "Enter Valid Email Id.",
          errorField: errorField,
        };
      }
    } else {
      return {
        isValid: false,
        message: `${labelName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  }
  if (CHECK_AT_LEAST_ONE_VALUE.test(emailId)) {
    if (EMAIL_VALIDATION.test(emailId)) {
      return {
        isValid: true,
      };
    } else {
      return {
        isValid: false,
        message: `In ${labelName} Enter Valid Email Id.`,
        messageTwo: "Enter Valid Email Id.",
        errorField: errorField,
      };
    }
  }
  return {
    isValid: true,
  };
};
// only number validation
export const numberValidation = (
  value,
  textFieldName,
  errorField,
  isMandatory,
  key
) => {
  console.log(value + "  " + textFieldName);
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${textFieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
      objectKey: key, // object key used to find specific object in array
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${textFieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
      if (CHECK_NUMBER_FIELD.test(value)) {
        return { isValid: true };
      }
      if (!CHECK_NUMBER_FIELD.test(value)) {
        return {
          isValid: false,
          message: `In ${textFieldName} contain only number.`,
          messageTwo: "This field contain only number.",
          errorField: errorField,
          objectKey: key, // object key used to find specific object in array
        };
      }
    } else {
      return {
        isValid: false,
        message: `${textFieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
        objectKey: key, // object key used to find specific object in array
      };
    }
  } else {
    if (value == undefined) {
      return { isValid: true };
    }
    if (CHECK_NUMBER_FIELD.test(value)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      message: `In ${textFieldName} contain only number.`,
      messageTwo: "This field contain only number.",
      errorField: errorField,
      objectKey: key, // object key used to find specific object in array
    };
  }
};
// only digit or floting value accept
export const digitOrDecimalValueValidation = (
  value,
  fieldName,
  errorField,
  isMandatory
) => {
  if (value == undefined && isMandatory) {
    return {
      isValid: false,
      message: `${fieldName} is Mandatory`,
      messageTwo: "This field is required. ",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${fieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${fieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (isMandatory) {
    if (!CHECK_AT_LEAST_ONE_VALUE.test(value)) {
      return {
        isValid: false,
        message: `${fieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    } else {
      if (DIGIT_OR_DECIMAL_VALUE_VALIDATION.test(value)) {
        return { isValid: true };
      } else {
        return {
          isValid: false,
          message: `${fieldName} contain only Digit or Decimal values`,
          messageTwo: "Enter only Digit or Decimal values",
          errorField: errorField,
        };
      }
    }
  } else {
    // if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
    if (DIGIT_OR_DECIMAL_VALUE_VALIDATION.test(value)) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: `${fieldName} contain only Digit or Decimal values`,
        messageTwo: "Enter only Digit or Decimal values",
        errorField: errorField,
      };
    }
    // }
    // else{return{isValid: true}}
  }
};
export const mobileNumberValidation = (
  mobileNumber,
  labelName,
  errorField,
  isMandatory
) => {
  if (CHECK_WHITE_SPACE_AT_START.test(mobileNumber)) {
    return {
      isValid: false,
      message: `In ${labelName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(mobileNumber)) {
    return {
      isValid: false,
      message: `In ${labelName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(mobileNumber)) {
      if (MOBILE_NUMBER_VALIDATION.test(mobileNumber)) {
        return {
          isValid: true,
        };
      } else {
        return {
          isValid: false,
          message: `In ${labelName} Enter Valid Mobile Number.`,
          messageTwo: "Enter Valid Mobile Number.",
          errorField: errorField,
        };
      }
    } else {
      return {
        isValid: false,
        message: `${labelName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  }
  if (CHECK_AT_LEAST_ONE_VALUE.test(mobileNumber)) {
    if (MOBILE_NUMBER_VALIDATION.test(mobileNumber)) {
      return {
        isValid: true,
      };
    } else {
      return {
        isValid: false,
        message: `In ${labelName} Enter Valid Mobile Number.`,
        messageTwo: "Enter Valid Mobile Number.",
        errorField: errorField,
      };
    }
  }
  return { isValid: true };
};

// Zip Code Validation
export const zipCodeValidation = (
  zipCode,
  labelName,
  errorField,
  isMandatory
) => {
  if (isMandatory) {
    if (!CHECK_AT_LEAST_ONE_VALUE.test(zipCode)) {
      return {
        isValid: false,
        message: `${labelName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  }
  if (ZIP_CODE_VALIDATION.test(zipCode)) {
    return {
      isValid: true,
    };
  } else {
    return {
      isValid: false,
      message: `In ${labelName} Enter Valid Zip Code.`,
      messageTwo: "Enter Valid Zip Code.",
      errorField: errorField,
    };
  }
};
// dropdown value validation
export const dropdownSelectMandatoryValidation = (
  selectValue,
  dropdownLabel,
  errorField,
  isMandatory
) => {
  if (isMandatory) {
    if (selectValue && CHECK_AT_LEAST_ONE_VALUE.test(selectValue)) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: `${dropdownLabel} is Mandatory`,
        messageTwo: "This field is Mandatory",
        errorField: errorField,
      };
    }
  }
  console.log("f");
  return { isValid: true };
};

// ================================================================================
//New Validation

// Avoid Whitespaces Throughout   used for code
export const validateWhiteSpacesCompletely = (
  value,
  codeFieldName,
  errorField,
  isMandatory
) => {
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${codeFieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${codeFieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (!CHECK_WHITE_SPACE_IN_STRING.test(value)) {
    if (isMandatory) {
      if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
        return { isValid: true };
      } else {
        return {
          isValid: false,
          message: `${codeFieldName} is Mandatory`,
          messageTwo: "This field is required. ",
          errorField: errorField,
        };
      }
    } else {
      return { isValid: true };
    }
  } else {
    return {
      isValid: false,
      message: ` Whitesspace is not allowed in ${codeFieldName} `,
      messageTwo: "Whitespace is not allowed.",
      errorField: errorField,
    };
  }
};

// Avoid Start & End Whitespaces   used for name
export const validateStartEndWhiteSpaces = (
  value,
  codeFieldName,
  errorField,
  isMandatory
) => {
  if (!value && isMandatory) {
    return {
      isValid: false,
      message: `${codeFieldName} is Mandatory`,
      messageTwo: "This field is required. ",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${codeFieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${codeFieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }

  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: `${codeFieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  } else {
    return { isValid: true };
  }
};

export const multiSelectDropDownValidation = (
  value,
  codeFieldName,
  errorField,
  isMandatory
) => {
  if (isMandatory) {
    if (value.length > 0) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: `${codeFieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  } else {
    return { isValid: true };
  }
};

export const urlValidation = (value, fieldName, errorField, isMandatory) => {
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
    } else {
      return {
        isValid: false,
        message: `${fieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  }
  if (URL_VALIDATION.test(value)) {
    return { isValid: true };
  } else {
    return {
      isValid: false,
      message: `${fieldName} Url not correct`,
      messageTwo: "Enter Valid URL. ",
      errorField: errorField,
    };
  }
};

export const phoneCodeValidation = (
  value,
  fieldName,
  errorField,
  isMandatory
) => {
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
      if (COUNTRY_PHONECODE.test(value)) {
        return { isValid: true };
      } else {
        return {
          isValid: false,
          message: `In ${fieldName} Enter Valid Country Code`,
          messageTwo: "Enter Valid Country Code. ",
          errorField: errorField,
        };
      }
    } else {
      return {
        isValid: false,
        message: `${fieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
  }
  if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
    if (COUNTRY_PHONECODE.test(value)) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: `In ${fieldName} Enter Valid Country Code`,
        messageTwo: "Enter Valid Country Code. ",
        errorField: errorField,
      };
    }
  }
  return { isValid: true };
};
//variant attribute dynamic fields validations
export const DynamicFieldsValidation = (
  fieldName,
  fieldValue,
  isMandatory,
  errorField,
  regex,
  validMessgae
) => {
  if (isMandatory) {
    if (CHECK_WHITE_SPACE_AT_START.test(fieldValue)) {
      return {
        isValid: false,
        message: `In ${fieldName} Whitespace is not allowed at starting.`,
        messageTwo: "Whitespace is not allowed at starting.",
        errorField: errorField,
      };
    }
    if (CHECK_WHITE_SPACE_AT_END.test(fieldValue)) {
      return {
        isValid: false,
        message: `In ${fieldName} Whitespace is not allowed at last.`,
        messageTwo: "Whitespace is not allowed at last.",
        errorField: errorField,
      };
    }
    if (fieldValue && CHECK_AT_LEAST_ONE_VALUE.test(fieldValue)) {
    } else {
      return {
        isValid: false,
        message: `${fieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
      };
    }
    if (regex) {
      if (new RegExp(regex).test(fieldValue)) {
        return { isValid: true };
      } else {
        return {
          isValid: false,
          message: `${fieldName} is Mandatory`,
          messageTwo: validMessgae,
          errorField: errorField,
        };
      }
    } else {
      console.log("Enter in method");
    }
  }
};


// only DATE_VALIDATION validation
export const dateVALIDATION = (
  value,
  textFieldName,
  errorField,
  isMandatory,
  key
) => {
  console.log(value + "  " + textFieldName);
  if (CHECK_WHITE_SPACE_AT_START.test(value)) {
    return {
      isValid: false,
      message: `In ${textFieldName} Whitespace is not allowed at starting.`,
      messageTwo: "Whitespace is not allowed at starting.",
      errorField: errorField,
      objectKey: key, // object key used to find specific object in array
    };
  }
  if (CHECK_WHITE_SPACE_AT_END.test(value)) {
    return {
      isValid: false,
      message: `In ${textFieldName} Whitespace is not allowed at last.`,
      messageTwo: "Whitespace is not allowed at last.",
      errorField: errorField,
    };
  }
  if (isMandatory) {
    if (CHECK_AT_LEAST_ONE_VALUE.test(value)) {
      if (DATE_VALIDATION.test(value)) {
        return { isValid: true };
      }
      if (!DATE_VALIDATION.test(value)) {
        return {
          isValid: false,
          message: `In ${textFieldName} contain DATE_VALIDATION.`,
          messageTwo: "This field contain DATE_VALIDATION.",
          errorField: errorField,
          objectKey: key, // object key used to find specific object in array
        };
      }
    } else {
      return {
        isValid: false,
        message: `${textFieldName} is Mandatory`,
        messageTwo: "This field is required. ",
        errorField: errorField,
        objectKey: key, // object key used to find specific object in array
      };
    }
  } else {
    if (value == undefined) {
      return { isValid: true };
    }
    if (DATE_VALIDATION.test(value)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      message: `In ${textFieldName} contain DATE_VALIDATION.`,
      messageTwo: "This field contain DATE_VALIDATION.",
      errorField: errorField,
      objectKey: key, // object key used to find specific object in array
    };
  }
};



// important function
export const ValidationChecking = (array) => {
  let validationResult = [];
  array.map((obj, key) => {
    const value = obj.filedValue;
    const name = obj.filedName;
    const errorField = obj.errorField;
    const isMandatory = obj.isMandatory;
    const objectKey = obj.key;

    const operations = {
      dateVALIDATION: dateVALIDATION,
      onlyAlphanumericValidation: onlyAlphanumericValidation,
      codeValidation: codeValidation,
      emailValidation: emailValidation,
      numberValidation: numberValidation,
      digitOrDecimalValueValidation: digitOrDecimalValueValidation,
      mobileNumberValidation: mobileNumberValidation,
      zipCodeValidation: zipCodeValidation,
      dropdownSelectMandatoryValidation: dropdownSelectMandatoryValidation,
      validateWhiteSpacesCompletely: validateWhiteSpacesCompletely,
      validateStartEndWhiteSpaces: validateStartEndWhiteSpaces,
      multiSelectDropDownValidation: multiSelectDropDownValidation,
      urlValidation: urlValidation,
      phoneCodeValidation: phoneCodeValidation,
      DynamicFieldsValidation: DynamicFieldsValidation,
      VariantAttributeValidation: VariantAttributeValidation,
    };

    const operation_name = obj.regexMethod;
    let resultData = operations[operation_name](
      value,
      name,
      errorField,
      isMandatory,
      objectKey
    );
    // const resultData = eval(`${obj.regexMethod}(value,name,errorField,isMandatory,objectKey)`);
    if (resultData && !resultData.isValid) {
      validationResult.push(resultData);
    }
  });
  return validationResult;
};

// variantAttributeValidation  dynamic field validation
export const VariantAttributeValidation = (array) => {
  console.log("main");
  console.log(array);
  let validationResult = [];
  array.map((obj, key) => {
    const value = obj.filedValue;
    const name = obj.filedName;
    const errorField = obj.errorField;
    const isMandatory = obj.isMandatory;
    const regex = obj.regex;
    const validmsg = obj.errorMessage;
    console.log(value);
    const resultData = DynamicFieldsValidation(
      name,
      value,
      isMandatory,
      errorField,
      regex,
      validmsg
    );
    if (resultData && !resultData.isValid) {
      validationResult.push(resultData);
    }
  });
  return validationResult;
};
