jQuery("#login-form").validate({
  rules: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  },
  messages: {
    email: {
      required: "Please enter email",
      email: "Please enter valid email",
    },
    password: {
      required: "Please enter your password",
    },
  },
  submitHandler: function (form) {
    form.submit();
  },
});

jQuery("#register-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Please enter email",
        email: "Please enter valid email",
      },
      password: {
        required: "Please enter your password",
      },
    },
    submitHandler: function (form) {
      form.submit();
    },
  });
