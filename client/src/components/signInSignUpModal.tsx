import React, { useState, useContext } from "react";

import SignInSignUp from "../pages/sign-in-sign-up"

import { Box, Button, Layer,  } from "grommet";

const SignInSignUpModal = () => {
    const [show, setOpen] = useState(true);
    const onOpen = () => setOpen(true);
    const onClose= () => setOpen(false);
    return (
      <Box>

          <Layer
            onEsc={onClose}
            onClickOutside={onClose}
          >
            <SignInSignUp/>
          </Layer>

      </Box>
    );
}

export default SignInSignUpModal;