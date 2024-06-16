import nodemailer  from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "pastor.ml09@gmail.com",
        pass: "ndjr zgyw aumg dcup"
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default transport