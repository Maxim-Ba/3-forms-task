export const rules = [
  {
    name: "name",
    rule: {
      required: true,
    },
  },
  {
    name: "second-name",
    rule: {
      required: true,
    },
  },
  {
    name: "position",
    rule: {
      required: true,
    },
  },
  {
    name: "email",
    rule: {
      required: true,
      pattern:
        "^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])*$",
    },
  },
  {
    name: "tel",
    rule: {
      required: true,
      pattern: "^\\+[\\d]{1,4} [\\d]{3}-[\\d]{3}-[\\d]{2}-[\\d]{2}$",
    },
  },
  {
    name: "password",
    rule: {
      pattern: "^.{7,}$",
      required: true,
    },
  },
  {
    name: "repeat-password",
    rule: {
      required: true,
    },
  },
  {
    name: "avatar",
    rule: {
      accept: ".jpg,.jpeg,.png",
    },
  },
  {
    name: "logo",
    rule: {
      accept: ".jpg,.jpeg,.png",
    },
  },
];
