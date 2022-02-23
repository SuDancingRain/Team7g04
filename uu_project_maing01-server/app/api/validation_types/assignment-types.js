/* eslint-disable */

const assignmentCreateDtoInType = shape({
    name:uu5String(255).isRequired(),
    type:uu5String(255).isRequired(),
    deadline:uu5String(255).isRequired(),
    description:uu5String(4000).isRequired(),
    supervisor:array(uu5String()).isRequired(),
    termId:id().isRequired(),
    userList:array(id()),
  });
  
  const assignmentUpdateDtoInType = shape({
    id: id().isRequired(),
    name:uu5String(255),
    type:uu5String(255),
    deadline:uu5String(255),
    description:uu5String(4000),
    supervisor:array(id()),
    termId:id(),
    userList:array(id()),
  });
  const assignmentDeleteDtoInType = shape({
    id: id().isRequired(),
      });

  const assignmentListDtoInType = shape({
    termId: uu5String(),
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });
  const assignmentGetDtoInType = shape({
    id: id().isRequired()
  });
  