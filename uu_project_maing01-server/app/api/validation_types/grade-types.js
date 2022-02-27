/* eslint-disable */

const gradeCreateDtoInType = shape({
  grade:oneOf(["1","2","3","4","5"]).isRequired(),
  assignmentId:id().isRequired(),
  userId:array(uu5String(255)).isRequired(),
});

const gradeUpdateDtoInType = shape({
  id: id().isRequired(),
  grade:oneOf(["1","2","3","4","5"]),
  assignmentId:id(),
  userId:array(uu5String(255)),
});
const gradeDeleteDtoInType = shape({
  id: id().isRequired(),
    });

const gradeListDtoInType = shape({
  assignmentId:uu5String(),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
const gradeGetDtoInType = shape({
  id: id().isRequired()
});
