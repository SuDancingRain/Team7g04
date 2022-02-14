/* eslint-disable */

const assignmentCreateDtoInType = shape({
    name:uu5String(255).isRequired(),
    type:uu5String(255).isRequired(),
    deadline:uu5String(255).isRequired(),
    description:uu5String(4000).isRequired(),
    supervisor:uu5String(255).isRequired(),
    termId:id().isRequired(),
  });
  
  const assignmentUpdateDtoInType = shape({
    id: id().isRequired(),
    name:uu5String(255),
    type:uu5String(255),
    deadline:uu5String(255),
    description:uu5String(4000),
    supervisor:uu5String(255),
    termId:id(),
  });
  const assignmentDeleteDtoInType = shape({
    id: id().isRequired(),
      });

  const assignmentListDtoInType = shape({
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });
  const assignmentGetDtoInType = shape({
    id: id().isRequired()
  });
  
  const assignmentFilterDtoInType = shape({

  });