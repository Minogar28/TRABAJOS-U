const incentivosRepo = require('../../Repositories/incentivos');
const constants = require('../../../constants');

async function handler(req, res) {
  try {
    const { estado, tipo_incentivo, busqueda, page = 1, limit = 10 } = req.query;
    
    const filtros = {
      estado: estado || 'VIGENTE',
      tipo_incentivo,
      busqueda,
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const response = await incentivosRepo.listarDocentesAsignados(filtros);

    if (response.status === constants.SUCCEEDED_MESSAGE) {
      return res.status(200).json({ 
        docentes: response.docentes,
        total: response.total,
        page: response.page,
        totalPages: response.totalPages
      });
    }

    return res.status(response.failure_code || 500).json({ 
      status: response.status, 
      message: response.failure_message 
    });
  } catch (error) {
    return res.status(500).json({ 
      status: constants.INTERNAL_ERROR_MESSAGE, 
      message: error.message 
    });
  }
}

module.exports = [handler]; 