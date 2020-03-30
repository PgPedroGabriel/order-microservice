import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.array().of(
    Yup.object().shape({
      event_id: Yup.string().required('O id do evento é obrigatório'),
      tickets: Yup.array()
        .of(
          Yup.object().shape({
            ticket_id: Yup.string().required('Id do ingresso é obrigatório'),
            ticket_qty: Yup.number().required(
              'QUantidade de ingressos é obrigatório'
            )
          })
        )
        .required('Ingressos obrigatórios')
    })
  );

  let error = null;

  const validate = await schema.validate(req.body).catch(e => {
    error = {
      message: e.message,
      field: e.path
    };
  });

  if (!validate) {
    return res.status(400).json({ error });
  }

  return next();
};
