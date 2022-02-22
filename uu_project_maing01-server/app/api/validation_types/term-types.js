/* eslint-disable */

const termCreateDtoInType = shape({
    year: integer().isRequired(),
    season: oneOf("winter","summer").isRequired(),
    subjectId:id().isRequired(),
    userList:array(id()),
    });
  
  const termUpdateDtoInType = shape({
    id: id().isRequired(),
    year: integer(),
    season: oneOf("winter","summer"),
    subjectId:id(),
    userList:array(id()),
  });
  const termDeleteDtoInType = shape({
    id: id().isRequired(),
      });

  const termListDtoInType = shape({
    subjectId:uu5String(), 
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });
  const termGetDtoInType = shape({
    id: id().isRequired()
  });
  