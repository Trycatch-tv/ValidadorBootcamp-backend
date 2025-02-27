const EvaluationCriteriaWeigths = [
  {
    id: 1,
    category: 'Resultados Verificados',
    weight: 0.45,
    criteriaParams: [
      {
        id: 1,
        code: 'RV01',
        label: 'Tasa de éxito: (total ubicados / total cupos ofertados)*100',
        weight: 30,
      },
      {
        id: 2,
        code: 'RV02',
        label:
          'Velocidad de inserción: meses promedio en conseguir trabajo luego de terminar',
        weight: 35,
      },
      {
        id: 3,
        code: 'RV03',
        label: 'Tasa de deserción: (total desertores / total matriculados)*100',
        weight: 30,
      },
      {
        id: 4,
        code: 'RV04',
        label:
          'Rol de entrada conseguido: primer rol con el que se engancha el egresado',
        weight: 5,
      },
    ],
  },
  {
    id: 2,
    category: ' Experiencia Formativa',
    weight: 0.3,
    criteriaParams: [
      {
        id: 1,
        code: 'EF01',
        label: 'Costo vs Retorno: inversión requerida vs retribución',
        weight: 5,
      },
      {
        id: 2,
        code: 'EF02',
        label: 'Antes: Requisitos de ingreso',
        weight: 5,
      },
      {
        id: 3,
        code: 'EF03',
        label: 'Antes: Proceso de admisión',
        weight: 5,
      },
      {
        id: 4,
        code: 'EF04',
        label: 'Durante: Calidad y actualidad de Contenidos',
        weight: 10,
      },
      {
        id: 5,
        code: 'EF05',
        label: 'Durante: Enfoque práctico',
        weight: 15,
      },
      {
        id: 6,
        code: 'EF06',
        label: 'Durante: Calidad de Docentes',
        weight: 10,
      },
      {
        id: 7,
        code: 'EF07',
        label: 'Durante: Mentoría',
        weight: 15,
      },
      {
        id: 8,
        code: 'EF08',
        label: 'Durante: Networking',
        weight: 10,
      },
      {
        id: 9,
        code: 'EF09',
        label: 'Después: Talleres de inserción laboral',
        weight: 15,
      },
      {
        id: 10,
        code: 'EF10',
        label: 'Después: Contacto con empresas',
        weight: 10,
      },
    ],
  },
  {
    id: 3,
    category: 'Confianza',
    weight: 0.2,
    criteriaParams: [
      {
        id: 1,
        code: 'CF01',
        label: 'Transparencia: Términos y condiciones',
        weight: 10,
      },
      {
        id: 2,
        code: 'CF02',
        label: 'Transparencia: Requisitos de admisión',
        weight: 10,
      },
      {
        id: 3,
        code: 'CF03',
        label: 'Transparencia: Condiciones de salida',
        weight: 5,
      },
      {
        id: 4,
        code: 'CF04',
        label: 'Transparencia: Canales de contacto',
        weight: 5,
      },
      {
        id: 5,
        code: 'CF05',
        label: 'Soporte: Sponsors, instituciones aliadas',
        weight: 10,
      },
      {
        id: 6,
        code: 'CF06',
        label: 'Demanda Externa: Perfiles requeridos',
        weight: 15,
      },
      {
        id: 7,
        code: 'CF07',
        label: 'Demanda Externa: Puestos disponibles',
        weight: 15,
      },
      {
        id: 8,
        code: 'CF08',
        label: 'Testimonios Auditados: De egresados',
        weight: 15,
      },
      {
        id: 9,
        code: 'CF09',
        label: 'Testimonios Auditados: De organizaciones referentes',
        weight: 15,
      },
    ],
  },
  {
    id: 4,
    category: 'Puntaje Reviews',
    weight: 0.05,
    criteriaParams: [
      {
        id: 1,
        code: 'PR01',
        label: 'Promedio de reviews: El bootcamp es bueno',
        weight: 0.05,
      },
    ],
  },
];

export default EvaluationCriteriaWeigths;
