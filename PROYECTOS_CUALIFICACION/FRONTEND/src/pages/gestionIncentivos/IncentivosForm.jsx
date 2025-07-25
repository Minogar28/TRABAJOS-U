import { useState } from 'react';
import { Box, Paper, TextField, MenuItem, Button } from '@mui/material';
import { Cancel, DoneAll } from '@mui/icons-material';
import { PageBreadcrumb } from 'components';
import Swal from 'sweetalert2';

const IncentivosForm = ({ data = {}, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: data.nombre || '',
    descripcion: data.descripcion || '',
    frecuencia_informe_dias: data.frecuencia_informe_dias || 30,
    tiempo_minimo_meses: data.tiempo_minimo_meses || 12,
    tiempo_maximo_meses: data.tiempo_maximo_meses || 12,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSave({
      ...formData,
      tiempo_minimo_meses: parseInt(formData.tiempo_minimo_meses, 10),
      tiempo_maximo_meses: parseInt(formData.tiempo_maximo_meses, 10),
      frecuencia_informe_dias: parseInt(formData.frecuencia_informe_dias, 10),
    });
    if (ok.success) {
      await Swal.fire({ icon: 'success', title: 'Guardado', text: 'Operación exitosa' });
    } else {
      await Swal.fire({ icon: 'error', title: 'Error', text: ok.message || 'No se pudo guardar' });
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '40vh' }}>
      <Box sx={{ flex: 1 }}>
        <PageBreadcrumb title="Registro de Incentivo" subName="App" />
        <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
              <TextField label="Nombre" name="nombre" fullWidth value={formData.nombre} onChange={handleChange} />
              <TextField type="number" label="Frecuencia informe (días)" name="frecuencia_informe_dias" fullWidth value={formData.frecuencia_informe_dias} onChange={handleChange} />
              <TextField type="number" label="Tiempo mínimo (meses)" name="tiempo_minimo_meses" fullWidth value={formData.tiempo_minimo_meses} onChange={handleChange} />
              <TextField type="number" label="Tiempo máximo (meses)" name="tiempo_maximo_meses" fullWidth value={formData.tiempo_maximo_meses} onChange={handleChange} />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField label="Descripción" name="descripcion" multiline rows={3} fullWidth value={formData.descripcion} onChange={handleChange} />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
              <Button variant="contained" color="error" onClick={onCancel} startIcon={<Cancel />}>Cancelar</Button>
              <Button type="submit" variant="contained" color="success" startIcon={<DoneAll />}>Guardar</Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default IncentivosForm; 