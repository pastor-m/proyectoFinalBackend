import transport from "../services/mail.service.js";

function premiumProdEmail(email,prod){
    transport.sendMail({
        from: "Coder Email <pastor.ml09@gmail.com>",
        to: email,
        subject: "Producto eliminado",
        html: `<h1>Producto Eliminado</h2>
                <p>Su producto ${prod.title} ha sido eliminado</p>`
    })
}

export default premiumProdEmail