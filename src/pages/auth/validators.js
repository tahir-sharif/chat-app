export const validators = {
  loginValidators: [
    (data) => {
      const userName = data.userName;
      if (userName) {
        if (userName.includes(".") || userName.includes("_")) {
          return false;
        }
        return "User name must contain an underscore(_) or dot(.)";
      }
      return "Please Enter Your User Name";
    },

    (data) => {
      const password = data.password;
      if (password && password.length >= 6) {
        return false;
      }
      return "Please Enter password with minimum 6 characters";
    },
  ],

  registerValidators: [
    (data) => {
      const userName = data.userName;
      if (userName) {
        if (userName.includes(".") || userName.includes("_")) {
          return false;
        }
        return "User name must contain an underscore(_) or dot(.)";
      }
      return "Please Enter Your User Name";
    },

    (data) => {
      const name = data.name;
      const error = "Please Enter Full Name";
      if (name && name.includes(" ")) {
        if (name.split(" ").every((s) => s !== "")) {
          return false;
        }
        return error;
      }
      return error;
    },

    (data) => {
      const { password, confirmPassword } = data;
      if (password && password.length >= 6) {
        if (password === confirmPassword) {
          return false;
        } else {
          return "password does'nt match";
        }
      } else {
        return "Please Enter password with minimum 6 characters";
      }
    },
  ],
};
