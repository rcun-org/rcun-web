import React, { useState } from "react";
import BaseInput from "@/shared/UI/Input/BaseInput";
import { register } from "@/shared/services/auth.service";
import BaseButton from "@/shared/UI/Button/BaseButton";

const RegistrationForm = ({ className, onRegister }) => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    password2: ""
  });

  const handleRegistration = async () => {
    //todo add client-side validation
    const registrationResult = await register(registrationData);

    setRegistrationData({
      username: "",
      password: "",
      password2: ""
    });

    if (registrationResult) {
      onRegister();
    }
  };

  return (
    <div className={className}>
      <BaseInput
        value={registrationData.username}
        onChange={(event) =>
          setRegistrationData({
            ...registrationData,
            username: event.target.value
          })
        }
        type="text"
        placeholder="Username"
      />
      <BaseInput
        value={registrationData.password}
        onChange={(event) =>
          setRegistrationData({
            ...registrationData,
            password: event.target.value
          })
        }
        type="password"
        placeholder="Password"
      />
      <BaseInput
        value={registrationData.password2}
        onChange={(event) =>
          setRegistrationData({
            ...registrationData,
            password2: event.target.value
          })
        }
        type="password"
        placeholder="Confirm password"
      />
      <BaseButton onClick={handleRegistration}>Continue</BaseButton>
    </div>
  );
};

export default RegistrationForm;
