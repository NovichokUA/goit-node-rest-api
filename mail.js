import nodemailer from "nodemailer";

const { META_USERNAME, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_USERNAME,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// export const sendMail = async (data) => {
//   const message = { ...data, from: META_USERNAME };
//   await transport.sendMail(message);
//   return true;
// };

const sendMail = (message) => {
  return transport.sendMail(message);
};

export default { sendMail };
