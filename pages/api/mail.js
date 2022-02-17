// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from "nodemailer";

export default  async  (req, res) => {
  const body = JSON.parse(req.body);
  const user = 'info@truenorth-educationcareerhub.eu'
  const pass = 'info@2022'
  if (req.method === 'POST') {
    console.log(body)
    const transporter = nodemailer.createTransport({
      host: 'server318.web-hosting.com',
      port: 465,
      secure: true,
      auth: {
        user:user,
        pass: pass,
      },
    });

    try {
      const emailRes = await transporter.sendMail({
        from: body.email,
        to: user,
        subject: `Contact form submission from ${body.name}`,
        html: `<p>You have a new contact form submission</p><br>
        <p><strong>Name: </strong> ${body.name} </p><br>
   
       <p><strong>Message: </strong> ${body.message} </p><br>

        `,
      });

      console.log('Message Sent');
    } catch (err) {
      console.log(err);
    }

    res.status(200).json(req.body);
  } else {
    // Handle any other HTTP method
    res.status(200).json({ status: 'error!' })
  }


}
