/* eslint-disable */

const gradeCreateDtoInType = shape({
  grade:integer(5).isRequired(),
  assignmentId:id().isRequired(),
  name:array(uu5String(255)),
  userId:array(uu5String(255)).isRequired(),
});

const gradeUpdateDtoInType = shape({
  id: id().isRequired(),
  grade:integer(5),
  assignmentId:id(),
  name:array(uu5String(255)),
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

const gradeFilterDtoInType = shape({

});