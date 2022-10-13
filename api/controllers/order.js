const { database } = require("../config/db");

const get_orders = (req,res) => {
    database
    .table("orders_details as od")
    .join([
      {
        table: "orders as o",
        on: "o.id = od.order_id",
      },
      {
        table: "products as p",
        on: "p.id = od.product_id",
      },
    ])
    .withFields([
      "o.id",
      "p.name",
      "p.description",
      "p.discount",
      "p.price",
      "p.img_url",
    ])
    .sort({ id: -1 })
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({ message: "No tiene compras pendientes" });
      }
    })
    .catch((err) => console.log(err));
}

const get_order = (req,res) => {
    let id = req.params.id;
    console.log(id)

    database
    .table("orders_details as od")
    .join([
      {
        table: "orders as o",
        on: "o.id = od.order_id",
      },
      {
        table: "products as p",
        on: "p.id = od.product_id",
      },
    ])
    .withFields([
      "o.id",
      "p.name",
      "p.description",
      "p.discount",
      "p.price",
      "p.img_url",
    ])
    .filter({ "o.id": id })
    .getAll()
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.json({ message: `No orders can be founded with ID: ${id}`});
      }
    })
    .catch((err) => console.log(err));
}

const update_order = (req,res) => {
    console.log("updated order");
}

const delete_order = (req,res) => {
    console.log("deleted order");
}

const add_order = async (req,res) => {
    let { email, name, total } = req.body;

    if (email !== null && name !== null) {
      products.forEach(async (products) => {
        database
          .table("orders_details")
          .insert({
            total_sale: products.id,
            email: email,
            fname: name,
            date_order: req._startTime
          })
          .then((newOrder) => {
              newOrder_id.push(newOrder.insertId)
              let emailData = {
                  from: 'PetShop <my@email.com>',
                  to: `${email}`,
                  subject: "Gracias por su Compra",
                  html: `<p><span style="font-size:16px">Hola,</span><br />
                                    &iexcl;Gracias por tu compra!<br />
                                    <br />`,
              };
              let confirmMail = {
                from: 'Pet Shop <my@email.com>',
                to: 'my@email.com',
                subject: "Confirmación de Mail enviado",
                html: `Se ha tomado la orden de ${email}`
              }
              let errorMail = {
                from: 'Anita Thomas Preset Pack <anitathomas@anitathomas.com.ar>',
                to: 'anitathomas@anitathomas.com.ar',
                subject: "Error de Mail enviado",
                html: `Ha a ocurrido un error=>,
                <br> al enviar el preset a ${email}.
                <br> Revisar con Soporte Técnico`
              }
              console.log(products.id)
              database
              .table("orders_details")
              .insert({
                order_id: newOrder.insertId,
                product_id: products.id,
                quantity: 1,
              })
              .then((newId) => {
                if (products.id == 1) {
                  transporter.sendMail(emailData1, (error) => {
                    if (error) {
                      transporter.sendMail(errorMail, (error)=>{
                        console.log(error);
                      })
                      console.log("Error al enviar email", error);
                    } else {
                      transporter.sendMail(confirmMail1)
                      console.log("Correo enviado correctamente");
                    }
                    transporter.close();
                  });
                } else if (products.id == 2) {
                  transporter.sendMail(emailData2, (error) => {
                    if (error) {
                      transporter.sendMail(errorMail, (error)=>{
                        console.log(error);
                      })
                      console.log("Error al enviar email", error);
                    } else {
                      transporter.sendMail(confirmMail2)
                      console.log("Correo enviado correctamente");
                    }
                    transporter.close();
                  });
                }
              })
              .catch((error) => console.log(error));
              if (newOrder_id.length == 1) {
                res.json({
                  message: "Orden realizada con exito",
                  success: true,
                });
              }
            });
        })
    } else {
      res.json({
        message: "Fallo el pedido",
        success: false,
      });
    }
}
module.exports = {get_orders, get_order, update_order, delete_order, add_order};
